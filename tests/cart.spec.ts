import { test, expect } from "../fixtures";
import { CartPage } from "../pages/CartPage";
import { products } from "../test-data/ProductsData";
import { sauceDemoBaseURL } from "../config/config";
import { Header } from "../pages/Header";

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Shopping cart', () => {

    for (const product of products) {
    test(`user can add and remove ${product.name} from cart`, async ({ loggedInPage, productsPage }) => {
      const cartPage = new CartPage(loggedInPage);
      const header = new Header(loggedInPage);

      await productsPage.addToCart(product.name);
      await expect (header.cartBadge).toHaveText('1');
      await header.openCart();
      await expect(loggedInPage).toHaveURL(sauceDemoBaseURL + '/cart.html');
      await expect(cartPage.getCartContents()).toContainText(product.name);
      await cartPage.removeProduct(product.name);
      await expect (header.cartBadge).toBeHidden();
      await expect(cartPage.getCartContents()).not.toContainText(product.name);

});
    }

    for (const product of products) {
    test(`user can add ${product.name} to cart and checkout`, async ({ loggedInPage, productsPage }) => {
      const cartPage = new CartPage(loggedInPage);
      const header = new Header(loggedInPage);

    await productsPage.addToCart(product.name);
    await header.openCart();
    await expect(loggedInPage).toHaveURL(sauceDemoBaseURL + '/cart.html');
    await expect(cartPage.getCartContents()).toContainText(product.name);
    await cartPage.checkout();
    await expect(loggedInPage).toHaveURL(sauceDemoBaseURL + '/checkout-step-one.html');

});
    }
});