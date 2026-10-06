import { test, expect } from "@playwright/test";
import { validUser } from "../test-data/loginData";
import { sortingData } from "../test-data/sortData";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { SideMenu } from "../pages/SideMenu";
import { baseURL } from "../config/config";

test.describe('Products sorting', () => {
    // logowanie
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    // sprawdzenie czy sie zalogował
    await expect(page).toHaveURL(validUser.expected);
    });


    test(`Logout`, async ({ page }) => {
        const sideMenu = new SideMenu(page);
        await sideMenu.logout();
        // sprawdzenie czy sie wylogowalismy
        await expect(page).toHaveURL(baseURL);

});

   for (const data of sortingData) {
        test(`Sorting - ${data.sort}`, async ({ page }) => {
            const productsPage = new ProductsPage(page);
            await productsPage.selectSort(data.sort);
            await expect(productsPage.firstProduct).toHaveText(data.expectedFirst);

});
   }
});