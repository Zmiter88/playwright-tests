import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
    readonly productName: Locator;

    constructor(private page: Page, productName: string) {
        this.productName = page.getByText(productName)
    }

   async addToCart() {
    await this.page.locator('[data-test="add-to-cart"]').click();
}
}