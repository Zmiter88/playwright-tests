import { test, expect } from "@playwright/test";
import { validUser, lockedUser, emptyUsername, emptyPassword } from "../test-data/loginData";
import { LoginPage } from "../pages/LoginPage";

const loginTestCases = [validUser, lockedUser, emptyUsername, emptyPassword];

test.describe("Login tests", () => {

  for (const user of loginTestCases) {
    test(`${user.testName}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.expectedType === "URL") {
        await expect(page).toHaveURL(user.expectedURL);
      } else {
        await expect(page.getByText(user.expectedError)).toBeVisible();
      }
    });
  }
});
