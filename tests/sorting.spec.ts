import { test, expect } from "@playwright/test";
import { validUser } from "../test-data/loginData";
import { sortCases } from "../test-data/sortData";

test.describe("Sorting products", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill(validUser.username);
    await page.getByPlaceholder("Password").fill(validUser.password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(validUser.expected);
  });

  for (const sortCase of sortCases) {
    test(`sort - ${sortCase.option}`, async ({ page }) => {
      await page.getByRole('combobox').selectOption(sortCase.option);

      const firstProduct = page.locator(".inventory_item_name").first();

      await expect(firstProduct).toHaveText(sortCase.expectedFirstProduct);
      await expect(firstProduct).toBeVisible();
    });
  }
});
