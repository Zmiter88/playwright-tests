import { test, expect } from "../fixtures";
import { CartPage } from "../pages/CartPage";
import { products } from "../test-data/ProductsData";
import { baseURL } from "../config/config";
import { Header } from "../pages/Header";

test.describe('Shopping cart', () => {

    for (const product of products) {
    test(`user can add and remove ${product.name} from cart`, async ({ loggedInPage, productsPage }) => {
      const cartPage = new CartPage(loggedInPage);
      const header = new Header(loggedInPage);

      await productsPage.addToCart(product.name);
      await header.openCart();
      await expect(loggedInPage).toHaveURL(baseURL + 'cart.html');
      await expect(cartPage.getCartContents()).toContainText(product.name);
      await cartPage.removeProduct(product.name);
      await expect(cartPage.getCartContents()).not.toContainText(product.name);

});
    }

    for (const product of products) {
    test(`user can add ${product.name} to cart and checkout`, async ({ loggedInPage, productsPage }) => {
      const cartPage = new CartPage(loggedInPage);
      const header = new Header(loggedInPage);

    await productsPage.addToCart(product.name);
    await header.openCart();
    await expect(loggedInPage).toHaveURL(baseURL + 'cart.html');
    await expect(cartPage.getCartContents()).toContainText(product.name);
    await cartPage.checkout();
    await expect(loggedInPage).toHaveURL(baseURL + 'checkout-step-one.html');

});
    }
});