import { test, expect } from "@playwright/test";
import { validUser, lockedUser } from "../test-data/loginData";

const users = [validUser, lockedUser];

test.describe("Login tests", () => {
  for (const user of users) {
    test(`login - ${user.username}`, async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");

      await page.getByPlaceholder("Username").fill(user.username);
      await page.getByPlaceholder("Password").fill(user.password);
      await page.getByRole("button", { name: "Login" }).click();

      if (user.expectedType === "URL") {
        await expect(page).toHaveURL(user.expected);
      } else {
        await expect(page.getByText(user.expected)).toBeVisible();
      }
    });
  }
});
