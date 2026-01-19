// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Cart Integration", () => {
  test("Cart badge displays correct count", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Add 2 products to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Verify cart badge shows '2'
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toContainText("2");

    // Add 1 more product
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Verify cart badge shows '3'
    await expect(cartBadge).toContainText("3");
  });

  test("Click cart icon to navigate to cart page", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Click the shopping cart icon
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify page navigates to cart page
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    // Verify added items are displayed in cart
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(2);
  });

  test("Cart persists after sorting", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Add Sauce Labs Backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Change sort order to 'Price (high to low)'
    await page.locator('[data-test="product-sort-container"]').selectOption("hilo");

    // Verify cart still shows '1'
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toContainText("1");

    // Navigate to cart to confirm item is still there
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(1);
  });

  test("Cart persists after filtering/navigation", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Add multiple products to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Click on a product to view details
    await page.locator('[data-test="item-4-title-link"]').click();

    // Click back to products
    await page.locator('[data-test="back-to-products"]').click();

    // Verify cart badge still shows correct count
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toContainText("3");
  });
});
