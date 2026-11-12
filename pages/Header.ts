    import { Locator, Page } from '@playwright/test';
    export class Header {
        readonly cartBadge: Locator;

        constructor(private page: Page) {
            this.cartBadge = page.locator('.shopping_cart_badge');
        }

    async openCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
}