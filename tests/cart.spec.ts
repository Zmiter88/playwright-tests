import { test, expect } from "@playwright/test";
import { validUser } from "../test-data/loginData";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { products } from "../test-data/ProductsData";
import { baseURL } from "../config/config";
import { Header } from "../pages/Header";

test.describe('Shopping cart', () => {
    // logowanie
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(validUser.expected);
    });

    for (const product of products) {
    test(`user can add and remove ${product.name} from cart`, async ({ page }) => {
      const productsPage = new ProductsPage(page);
      const cartPage = new CartPage(page);
      const header = new Header(page);

      await productsPage.addToCart(product.name);
      await header.openCart();
      await expect(page).toHaveURL(baseURL + 'cart.html');
      await expect(cartPage.getCartContents()).toContainText(product.name);
      await cartPage.removeProduct(product.name);
      await expect(cartPage.getCartContents()).not.toContainText(product.name);

});
    }

    for (const product of products) {
    test(`user can add ${product.name} to cart and checkout`, async ({ page }) => {
      const productsPage = new ProductsPage(page);
      const cartPage = new CartPage(page);
      const header = new Header(page);

    await productsPage.addToCart(product.name);
    await header.openCart();
    await expect(page).toHaveURL(baseURL + 'cart.html');
    await expect(cartPage.getCartContents()).toContainText(product.name);
    await cartPage.checkout();
    await expect(page).toHaveURL(baseURL + 'checkout-step-one.html');

});
    }
});