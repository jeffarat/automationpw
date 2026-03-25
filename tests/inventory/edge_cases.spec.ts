// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { Login } from "../../pages/Login";
import { Inventory } from "../../pages/Inventory";
import userData from "../../data/loginData.json";

test.describe("Edge Cases and Error Handling", () => {
  let inventory: Inventory;

  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    inventory = new Inventory(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillUsername(userData.credentials.username);
    await loginPage.fillPassword(userData.credentials.password);
    await loginPage.clickOnLoginButton();
  });

  test("Attempt to add excessive items to cart", async ({ page }) => {
    await test.step("Add all 6 products to cart", async () => {
      const addButtons = page.locator('[data-test^="add-to-cart-"]');
      const count = await addButtons.count();
      for (let i = 0; i < count; i++) {
        await addButtons.nth(i).click();
      }
    });

    await test.step("Verify cart badge shows 6", async () => {
      await expect(inventory.cartBadge).toContainText("6");
    });

    await test.step("Verify no duplicate items in cart", async () => {
      await inventory.clickCart();
      const cartItems = await page
        .locator('[data-test="inventory-item-name"]')
        .count();
      expect(cartItems).toBe(6);
    });
  });

  test("Handle rapid add/remove clicks", async () => {
    const addButton = inventory.addToCartButton("sauce-labs-backpack");
    const removeButton = inventory.removeButton("sauce-labs-backpack");

    await test.step("Rapidly click add and remove 3 times", async () => {
      for (let i = 0; i < 3; i++) {
        await addButton.click();
        await removeButton.click();
      }
    });

    await test.step("Verify final state - cart should be empty", async () => {
      await expect(inventory.cartBadge).not.toBeVisible();
    });
  });

  test("Verify product data integrity", async ({ page }) => {
    let prices: string[];
    let productNames: string[];

    await test.step("Record all product prices and names", async () => {
      prices = await inventory.getProductPriceTexts();
      productNames = await inventory.getProductTitleTexts();
    });

    await test.step("Reload the page", async () => {
      await page.reload();
    });

    await test.step("Verify prices and product names remain unchanged", async () => {
      const newPrices = await inventory.getProductPriceTexts();
      expect(newPrices).toEqual(prices!);

      const newProductNames = await inventory.getProductTitleTexts();
      expect(newProductNames).toEqual(productNames!);
    });
  });
});
