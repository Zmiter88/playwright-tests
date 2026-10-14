import { test, expect } from "../fixtures";
import { validUser } from "../test-data/loginData";
import { SideMenu } from "../pages/SideMenu";
import { baseURL } from "../config/config";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { products } from "../test-data/ProductsData";
import { CartPage } from "../pages/CartPage";
import { Header } from "../pages/Header";

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Products', () => {

for (const product of products) {
    test(`Open ${product.name} details`, async ({ loggedInPage, productsPage }) => {
        const productDetailsPage = new ProductDetailsPage(loggedInPage, product.name);
        await productsPage.openProduct(product.name);
        await expect(productDetailsPage.productName).toBeVisible();
        await expect(loggedInPage).toHaveURL(baseURL + `inventory-item.html?id=${product.id}`);
        await expect(productDetailsPage.productName).toHaveText(product.name);
    });
}


for (const product of products) {

  test(`Add ${product.name} to cart and continue shopping`, async ({ loggedInPage, productsPage }) => {
    const cartPage = new CartPage(loggedInPage);
    const header = new Header(loggedInPage);
    
    await productsPage.addToCart(product.name);
    await header.openCart();
    await expect(cartPage.getCartContents()).toContainText(product.name);
    await cartPage.continueShopping();
    await expect(loggedInPage).toHaveURL(validUser.expected);
  });
}

for (const product of products) {

  test(`Add ${product.name} to cart from details page`, async ({ loggedInPage, productsPage }) => {
    const cartPage = new CartPage(loggedInPage);
    const productDetailsPage = new ProductDetailsPage(loggedInPage, product.name);
    const header = new Header(loggedInPage);

    await productsPage.openProduct(product.name);
    await expect(productDetailsPage.productName).toBeVisible();
    await expect(loggedInPage).toHaveURL(baseURL + `inventory-item.html?id=${product.id}`);
    await productDetailsPage.addToCart();
    await header.openCart();
    await expect(cartPage.getCartContents()).toContainText(product.name);
  });
}
 
    test(`Logout`, async ({ loggedInPage }) => {
      const sideMenu = new SideMenu(loggedInPage);

      await sideMenu.logout();
      // sprawdzenie czy sie wylogowalismy
      await expect(loggedInPage).toHaveURL(baseURL);

});
});