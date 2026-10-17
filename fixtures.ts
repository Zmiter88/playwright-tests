import { test as base, expect, Page } from '@playwright/test';
import { baseURL } from './config/config';
import { ProductsPage } from './pages/ProductsPage';

type MyFixtures = {
    loggedInPage: Page;
    appURL: string;
    productsPage: ProductsPage;
};

export const test = base.extend<MyFixtures>({

loggedInPage: async ({ page }, use) => {
    await page.goto(`${baseURL}inventory.html`);
    await expect(page.locator('.inventory_list')).toBeVisible();
    await use(page);
},

    appURL: async ({}, use) => {
        await use(baseURL);
    },

    productsPage: async ({loggedInPage}, use) => {
        const productsPage = new ProductsPage(loggedInPage);
        await use(productsPage); 
    }

});
export {expect};
