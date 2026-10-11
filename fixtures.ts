import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { validUser } from './test-data/loginData';
import { baseURL } from './config/config';
import { ProductsPage } from './pages/ProductsPage';

type MyFixtures = {
    loggedInPage: Page;
    appURL: string;
    productsPage: ProductsPage;
};

export const test = base.extend<MyFixtures>({

    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);
        await expect(page).toHaveURL(validUser.expected);
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
