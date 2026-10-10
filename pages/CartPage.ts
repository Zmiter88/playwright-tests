import { Page, Locator } from '@playwright/test';

export class CartPage {

    constructor(private page: Page) {}

    async removeProduct(productName: string) {
        await this.page
        .locator('.cart_item')
        .filter({hasText: productName})
        .getByRole('button', {name: 'Remove'})
        .click();
}

    async checkout() {
        await this.page.getByRole('button', {name: 'Checkout'}).click();
    }


    async continueShopping() {
        await this.page.getByRole('button', {name: 'Continue Shopping'}).click();
    }

    getCartContents(): Locator {
        return this.page.locator('.cart_list');
    }
}