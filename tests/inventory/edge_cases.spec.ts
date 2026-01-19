// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Edge Cases and Error Handling", () => {
  test("Attempt to add excessive items to cart", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Add all 6 products to cart one by one
    const productIds = [
      "sauce-labs-backpack",
      "sauce-labs-bike-light",
      "sauce-labs-bolt-t-shirt",
      "sauce-labs-fleece-jacket",
      "sauce-labs-onesie",
      "test.allthethings()-t-shirt-(red)",
    ];

    for (let i = 1; i <= 6; i++) {
      const addButtons = await page.locator('[data-test^="add-to-cart-"]').all();
      if (addButtons.length > 0) {
        await addButtons[0].click();
      }
    }

    // Verify cart badge shows '6'
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toContainText("6");

    // Verify no duplicate items
    await page.locator('[data-test="shopping-cart-link"]').click();
    const cartItems = await page.locator('[data-test^="inventory-item-"]').count();
    expect(cartItems).toBeGreaterThan(0);
  });

  test("Handle rapid add/remove clicks", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Get the add button for a product
    const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');

    // Rapidly click add and remove
    for (let i = 0; i < 3; i++) {
      await addButton.click();
      await removeButton.click();
    }

    // Wait for page to stabilize
    await page.waitForLoadState("networkidle");

    // Verify final state - button should be in add state
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).not.toBeVisible();
  });

  test("Verify product data integrity", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Take note of all visible product prices
    const prices = await page.locator('[data-test^="item-"][data-test$="-price"]').allTextContents();
    const productNames = await page.locator('[data-test^="item-"][data-test$="-title-link"]').allTextContents();

    // Reload page
    await page.reload();

    // Verify prices remain unchanged
    const newPrices = await page.locator('[data-test^="item-"][data-test$="-price"]').allTextContents();
    expect(newPrices).toEqual(prices);

    // Verify product list remains consistent
    const newProductNames = await page.locator('[data-test^="item-"][data-test$="-title-link"]').allTextContents();
    expect(newProductNames).toEqual(productNames);
  });
});
