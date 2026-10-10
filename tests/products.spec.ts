import { test, expect } from "@playwright/test";
import { validUser } from "../test-data/loginData";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { SideMenu } from "../pages/SideMenu";
import { baseURL } from "../config/config";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { products } from "../test-data/ProductsData";
import { CartPage } from "../pages/CartPage";
import { Header } from "../pages/Header";

test.describe('Products', () => {
    // logowanie
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    // sprawdzenie czy sie zalogował
    await expect(page).toHaveURL(validUser.expected);
    });


for (const product of products) {
    test(`Open ${product.name} details`, async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const productDetailsPage = new ProductDetailsPage(page, product.name);
        await productsPage.openProduct(product.name);
        await expect(productDetailsPage.productName).toBeVisible();
        await expect(page).toHaveURL(baseURL + `inventory-item.html?id=${product.id}`);
        await expect(productDetailsPage.productName).toHaveText(product.name);
    });
}


for (const product of products) {

  test(`Add ${product.name} to cart and continue shopping`, async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const header = new Header(page);
    
    await productsPage.addToCart(product.name);
    await header.openCart();
    await expect(cartPage.getCartContents()).toContainText(product.name);
    await cartPage.continueShopping();
    await expect(page).toHaveURL(validUser.expected);
  });
}

for (const product of products) {

  test(`Add ${product.name} to cart from details page`, async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const productDetailsPage = new ProductDetailsPage(page, product.name);
    const header = new Header(page);

    await productsPage.openProduct(product.name);
    await expect(productDetailsPage.productName).toBeVisible();
    await expect(page).toHaveURL(baseURL + `inventory-item.html?id=${product.id}`);
    await productDetailsPage.addToCart();
    await header.openCart();
    await expect(cartPage.getCartContents()).toContainText(product.name);
  });
}
 
    test(`Logout`, async ({ page }) => {
      const sideMenu = new SideMenu(page);

      await sideMenu.logout();
      // sprawdzenie czy sie wylogowalismy
      await expect(page).toHaveURL(baseURL);

});
});