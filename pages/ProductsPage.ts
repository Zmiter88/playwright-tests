import { Page, Locator } from '@playwright/test';

export class ProductsPage {

    private sortDropdown: Locator;
    readonly firstProduct: Locator;

    constructor(private page: Page) {
        this.sortDropdown = page.getByRole('combobox', { name: 'Sort products' });
        this.firstProduct = page.locator('.inventory_item_name').first();
    }

    async selectSort(sort: string) {
        await this.sortDropdown.selectOption(sort);
    }

}