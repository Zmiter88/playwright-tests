import { test, expect } from "@playwright/test";
import { validUser } from "../test-data/loginData";
import { sortCases } from "../test-data/sortData";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";

test.describe("Sorting products", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(validUser.expected);
  });

  for (const sortCase of sortCases) {
    test(`sort - ${sortCase.option}`, async ({ page }) => {
      const productsPage = new ProductsPage(page);

      await productsPage.selectSort(sortCase.option);
      await expect(productsPage.firstProduct).toHaveText(sortCase.expectedFirstProduct);
      await expect(productsPage.firstProduct).toBeVisible();
    });
  }
});
