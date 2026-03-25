// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { Login } from "../../pages/Login";
import { Inventory } from "../../pages/Inventory";
import userData from "../../data/loginData.json";

test.describe("Cart Integration", () => {
  let inventory: Inventory;

  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    inventory = new Inventory(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillUsername(userData.credentials.username);
    await loginPage.fillPassword(userData.credentials.password);
    await loginPage.clickOnLoginButton();
  });

  test("Cart badge displays correct count", async () => {
    await test.step("Add 2 products to cart", async () => {
      await inventory.addProductToCart("sauce-labs-backpack");
      await inventory.addProductToCart("sauce-labs-bike-light");
    });

    await test.step("Verify cart badge shows 2", async () => {
      await expect(inventory.cartBadge).toContainText("2");
    });

    await test.step("Add 1 more product", async () => {
      await inventory.addProductToCart("sauce-labs-bolt-t-shirt");
    });

    await test.step("Verify cart badge shows 3", async () => {
      await expect(inventory.cartBadge).toContainText("3");
    });
  });

  test("Click cart icon to navigate to cart page", async ({ page }) => {
    await test.step("Add items to cart", async () => {
      await inventory.addProductToCart("sauce-labs-backpack");
      await inventory.addProductToCart("sauce-labs-bike-light");
    });

    await test.step("Click the shopping cart icon", async () => {
      await inventory.clickCart();
    });

    await test.step("Verify navigation to cart page with added items", async () => {
      await expect(page).toHaveURL(/\/cart\.html/);
      await expect(
        page.locator('[data-test="inventory-item-name"]'),
      ).toHaveCount(2);
    });
  });

  test("Cart persists after sorting", async ({ page }) => {
    await test.step("Add Sauce Labs Backpack to cart", async () => {
      await inventory.addProductToCart("sauce-labs-backpack");
    });

    await test.step("Change sort order to Price high to low", async () => {
      await inventory.sortBy("hilo");
    });

    await test.step("Verify cart still shows 1", async () => {
      await expect(inventory.cartBadge).toContainText("1");
    });

    await test.step("Navigate to cart and confirm item is still there", async () => {
      await inventory.clickCart();
      await expect(
        page.locator('[data-test="inventory-item-name"]'),
      ).toHaveCount(1);
    });
  });

  test("Cart persists after filtering/navigation", async () => {
    await test.step("Add multiple products to cart", async () => {
      await inventory.addProductToCart("sauce-labs-backpack");
      await inventory.addProductToCart("sauce-labs-bike-light");
      await inventory.addProductToCart("sauce-labs-bolt-t-shirt");
    });

    await test.step("Navigate to product details and back", async () => {
      await inventory.clickProductTitle(4);
      await inventory.backToProductsButton.click();
    });

    await test.step("Verify cart badge still shows correct count", async () => {
      await expect(inventory.cartBadge).toContainText("3");
    });
  });
});
