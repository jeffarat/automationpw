// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { Login } from "../../pages/Login";
import { Inventory } from "../../pages/Inventory";
import userData from "../../data/loginData.json";

test.describe("Product Details and Navigation", () => {
  let inventory: Inventory;

  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    inventory = new Inventory(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillUsername(userData.credentials.username);
    await loginPage.fillPassword(userData.credentials.password);
    await loginPage.clickOnLoginButton();
  });

  test("Click on product name to view product details", async ({ page }) => {
    await test.step("Click on Sauce Labs Backpack title", async () => {
      await inventory.clickProductTitle(4);
    });

    await test.step("Verify product detail page loads", async () => {
      await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
      await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
      await expect(
        page.locator('img[alt="Sauce Labs Backpack"]'),
      ).toBeVisible();
    });
  });

  test("Click on product image to view product details", async ({ page }) => {
    await test.step("Click on Sauce Labs Bike Light image", async () => {
      await inventory.clickProductImage("Sauce Labs Bike Light");
    });

    await test.step("Verify product detail page loads", async () => {
      await expect(page).toHaveURL(/inventory-item\.html\?id=0/);
    });
  });

  test("Navigate back from product details to inventory", async ({ page }) => {
    await test.step("Click on a product to view details", async () => {
      await inventory.clickProductTitle(4);
    });

    await test.step("Click Back to products button", async () => {
      await inventory.backToProductsButton.click();
    });

    await test.step("Verify page returns to inventory with all products", async () => {
      await expect(page).toHaveURL(/\/inventory\.html/);
      await expect(inventory.productTitles).toHaveCount(6);
    });
  });

  test("View product description and specifications", async ({ page }) => {
    await test.step("Verify product is visible on inventory page", async () => {
      const firstProduct = page.locator('[data-test^="item-"]').first();
      await expect(firstProduct).toBeVisible();
    });

    await test.step("Click on a product to view full details", async () => {
      await inventory.clickProductTitle(4);
    });

    await test.step("Verify product information is accessible", async () => {
      await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
    });
  });
});
