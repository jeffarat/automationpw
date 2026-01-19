// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Add to Cart Functionality", () => {
  test("Add single product to cart", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Click 'Add to cart' button on the Sauce Labs Backpack
    const addButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    await addButton.click();

    // Verify the cart badge updates to show '1'
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toContainText("1");

    // Verify the button changes to 'Remove'
    const removeButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );
    await expect(removeButton).toBeVisible();
  });

  test("Add multiple different products to cart", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Add Sauce Labs Backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Add Sauce Labs Bike Light to cart
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();

    // Add Sauce Labs Bolt T-Shirt to cart
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
      .click();

    // Verify cart badge now shows '3'
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toContainText("3");
  });

  test("Remove product from cart on inventory page", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Add item to cart first
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Verify 'Remove' button is displayed
    const removeButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );
    await expect(removeButton).toBeVisible();

    // Click 'Remove' button
    await removeButton.click();

    // Verify cart badge disappears
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).not.toBeVisible();

    // Verify button reverts to 'Add to cart'
    const addButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    await expect(addButton).toBeVisible();
  });

  test("Add to cart then remove from cart", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Add Sauce Labs Onesie to cart
    const addButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-onesie"]',
    );
    await addButton.click();

    // Verify button changes to Remove
    const removeButton = page.locator('[data-test="remove-sauce-labs-onesie"]');
    await expect(removeButton).toBeVisible();

    // Remove Sauce Labs Onesie from cart
    await removeButton.click();

    // Verify button changes back to Add to cart
    await expect(addButton).toBeVisible();

    // Add it back to cart
    await addButton.click();
    await expect(removeButton).toBeVisible();
  });
});
