import { test, expect } from "@playwright/test";
import { validUser } from "../test-data/loginData";

test.describe('Shopping cart', () => {
    // logowanie
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill(validUser.username);
    await page.getByPlaceholder("Password").fill(validUser.password);
    await page.getByRole("button", { name: "Login" }).click();
    // sprawdzenie czy sie zalogował
    await expect(page).toHaveURL(validUser.expected);
    });
    test(`user can add product to cart`, async ({ page }) => {
    // Wersja początkowa - bez hierarchicznego locatora
    // const addBackpackToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    // await addBackpackToCart.click();

    // Refaktor - najpierw znajdujemy konkretny produkt,
    // a następnie przycisk znajdujący się w jego obrębie
    const backpack = page.locator('.inventory_item').filter({hasText: 'Sauce Labs Backpack'})
    const addBackpackToCart = backpack.getByRole('button', {name: 'Add to cart' })
    await addBackpackToCart.click();
    // znalezienie koszyka
    const cart = page.getByRole('button', {name: 'Cart, 1 items'});
    // sprawdzenie ze koszyk ma 1 produkt - metoda toHaveAttribute('klucz', 'wartosc')
    await expect(cart).toHaveAttribute('aria-label', 'Cart, 1 items');
    // klikniecie koszyka
    await cart.click();
    // sprawdzenie ze weszlismy w koszyk
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    // sprawdzenie, że w koszyku jest Sauce Labs Backpack
    const backpackInCart = page.getByText('Sauce Labs Backpack')
    await expect(backpackInCart).toHaveText('Sauce Labs Backpack')
});
});