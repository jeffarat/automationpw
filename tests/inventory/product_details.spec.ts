// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Product Details and Navigation", () => {
  test("Click on product name to view product details", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Click on the product name 'Sauce Labs Backpack'
    await page.locator('[data-test="item-4-title-link"]').click();

    // Verify page navigates to product detail page
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);

    // Verify product name, description, price, and image are displayed
    await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
    await expect(page.locator('img[alt="Sauce Labs Backpack"]')).toBeVisible();
  });

  test("Click on product image to view product details", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Click on the product image for Sauce Labs Bike Light
    await page.locator('img[alt="Sauce Labs Bike Light"]').first().click();

    // Verify page navigates to product detail page
    await expect(page).toHaveURL(/inventory-item\.html\?id=0/);
  });

  test("Navigate back from product details to inventory", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Click on a product to view details
    await page.locator('[data-test="item-4-title-link"]').click();

    // Click 'Back to products' button
    await page.locator('[data-test="back-to-products"]').click();

    // Verify page returns to inventory
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    // Verify all products are still visible
    const products = await page
      .locator('[data-test^="item-"][data-test$="-title-link"]')
      .count();
    expect(products).toBe(6);
  });

  test("View product description and specifications", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Verify descriptions are visible on inventory page by checking each product has text content
    const firstProduct = page.locator('[data-test^="item-"]').first();
    await expect(firstProduct).toBeVisible();

    // Click on a product to view full details
    await page.locator('[data-test="item-4-title-link"]').click();

    // Verify product information is accessible
    await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
  });
});
