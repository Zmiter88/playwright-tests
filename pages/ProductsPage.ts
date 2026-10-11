import { Page, Locator } from '@playwright/test';
import { SortOption } from '../test-data/sortData';

export class ProductsPage {

    private sortDropdown: Locator;
    readonly firstProduct: Locator;

    constructor(private page: Page) {
        this.sortDropdown = page.getByRole('combobox', { name: 'Sort products' });
        this.firstProduct = page.locator('.inventory_item_name').first();
    }

    async openProduct(productName: string) {
        await this.page.getByText(productName).click();
    }

    async selectSort(sort: SortOption) {
        await this.sortDropdown.selectOption(sort);
    }

    async addToCart(productName: string) {
          await this.page
          .locator('.inventory_item')
          .filter({hasText: productName})
          .getByRole('button', {name: 'Add to cart'})
          .click();
    }
}