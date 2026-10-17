import path from "node:path";
import { test, expect } from "@playwright/test";
import { validUser } from "../test-data/loginData";
import { LoginPage } from "../pages/LoginPage";


const authFile = path.join(__dirname, "../playwright/.auth/user.json");

test('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(validUser.expected);
    await expect(page.locator('.inventory_list')).toBeVisible();

    await page.context().storageState({ path: authFile });

});