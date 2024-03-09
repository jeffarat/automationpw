import { test, expect } from "@playwright/test";
import { Login } from "../pages/Login";
import userData from "../data/loginData.json";

test.describe("Login scenarios", () => {
  test("Login using valid credentials", async ({ page }) => {
    const loginPage = new Login(page);
    await test.step("Navigate to the login page", async () => {
      await loginPage.gotoLoginPage();
    });
    await test.step("Fill the login form", async () => {
      await loginPage.fillUsername(userData.credentials.username);
      await loginPage.fillPassword(userData.credentials.password);
      await loginPage.clickOnLoginButton();
    });
    await test.step("Check that the user is redirected to the inventory page", async () => {
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await expect(page).toHaveTitle(/.*Swag Labs/);
    });
  });
});
