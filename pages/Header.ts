    import { Page } from '@playwright/test';
    export class Header {

        constructor(private page: Page) {}

    async openCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
}