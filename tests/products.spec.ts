import { test, expect } from "@playwright/test";
import { validUser } from "../test-data/loginData";
import { sortingData } from "../test-data/sortData";

test.describe('Products sorting', () => {
    // logowanie
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill(validUser.username);
    await page.getByPlaceholder("Password").fill(validUser.password);
    await page.getByRole("button", { name: "Login" }).click();
    // sprawdzenie czy sie zalogował
    await expect(page).toHaveURL(validUser.expected);
    });

    test(`Sorting`, async ({ page }) => {
        // klikniecie sortowanie az
        await page.getByRole('combobox', {name: 'Sort products'}).selectOption('az');
        const firstProduct = page.locator('.inventory_item_name').first();
        await expect(firstProduct).toHaveText('Sauce Labs Backpack');
});

    test(`Logout`, async ({ page }) => {
        // znalezienie przycisku Open menu
        const openMenu = page.getByRole('button', {name: 'Open menu'});
        // klikniecie w niego
        await openMenu.click();
        // znalezienie przycisku logout
        const logoutButton = page.getByRole('button', {name: 'Logout'});
        // wylogowanie sie
        await logoutButton.click();
        // sprawdzenie czy sie wylogowalismy
        await expect(page).toHaveURL('https://www.saucedemo.com/');

});

   for (const data of sortingData) {
        test(`Sorting - ${data.sort}`, async ({ page }) => {
            await page.getByRole('combobox', {name: 'Sort products'}).selectOption(data.sort);
            const firstProduct = page.locator('.inventory_item_name').first();
            await expect(firstProduct).toHaveText(data.expectedFirst);

});
   }
});