import { test, expect } from "@playwright/test";
import { validUser, lockedUser } from "../test-data/loginData";
import { LoginPage } from "../pages/LoginPage";

const users = [validUser, lockedUser];

test.describe("Login tests", () => {
  for (const user of users) {
    test(`login - ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.expectedType === "URL") {
        await expect(page).toHaveURL(user.expected);
      } else {
        await expect(page.getByText(user.expected)).toBeVisible();
      }
    });
  }
});
