// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { Login } from "../../pages/Login";
import { Inventory } from "../../pages/Inventory";
import userData from "../../data/loginData.json";

test.describe("Product Display and Filtering", () => {
  let inventory: Inventory;

  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    inventory = new Inventory(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillUsername(userData.credentials.username);
    await loginPage.fillPassword(userData.credentials.password);
    await loginPage.clickOnLoginButton();
  });

  test("Display all products on inventory page", async ({ page }) => {
    await test.step("Verify all 6 products are displayed", async () => {
      await expect(inventory.productTitles).toHaveCount(6);
    });

    await test.step("Verify each product shows name, description, price, and add to cart button", async () => {
      const expectedProducts = [
        "Sauce Labs Backpack",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Onesie",
        "Test.allTheThings() T-Shirt (Red)",
      ];

      for (const productName of expectedProducts) {
        const productLink = page.locator(`a:has-text("${productName}")`);
        await expect(productLink).toBeVisible();

        const productContainer = productLink.locator("..").locator("..");
        await expect(
          productContainer.locator('[data-test*="price"]'),
        ).toBeVisible();
        await expect(
          productContainer.locator('button:has-text("Add to cart")'),
        ).toBeVisible();
      }
    });
  });
});
