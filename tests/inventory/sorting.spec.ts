// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Product Display and Filtering", () => {
  test("Sort products by name A to Z", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Verify the sort dropdown is visible and defaults to 'Name (A to Z)'
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await expect(sortDropdown).toBeVisible();
    await expect(sortDropdown).toHaveValue("az");

    // Verify products are sorted alphabetically from A to Z
    const productTitles = await page.locator('[data-test^="item-"] [data-test$="-title-link"]').allTextContents();
    const sortedTitles = [...productTitles].sort();
    expect(productTitles).toEqual(sortedTitles);
  });

  test("Sort products by name Z to A", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Click the sort dropdown and select 'Name (Z to A)'
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await sortDropdown.selectOption("za");

    // Verify products are re-ordered in reverse alphabetical order
    const productTitles = await page.locator('[data-test^="item-"] [data-test$="-title-link"]').allTextContents();
    const reverseSorted = [...productTitles].sort().reverse();
    expect(productTitles).toEqual(reverseSorted);
  });

  test("Sort products by price low to high", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Click the sort dropdown and select 'Price (low to high)'
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await sortDropdown.selectOption("lohi");

    // Verify products are sorted by price from lowest to highest
    const prices = await page.locator('[data-test^="item-"][data-test$="-price"]').allTextContents();
    const priceValues = prices.map((p) => parseFloat(p.replace("$", "")));
    const sortedPrices = [...priceValues].sort((a, b) => a - b);
    expect(priceValues).toEqual(sortedPrices);
  });

  test("Sort products by price high to low", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Click the sort dropdown and select 'Price (high to low)'
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await sortDropdown.selectOption("hilo");

    // Verify products are sorted by price from highest to lowest
    const prices = await page.locator('[data-test^="item-"][data-test$="-price"]').allTextContents();
    const priceValues = prices.map((p) => parseFloat(p.replace("$", "")));
    const sortedPrices = [...priceValues].sort((a, b) => b - a);
    expect(priceValues).toEqual(sortedPrices);
  });

  test("Verify product prices are displayed correctly", async ({ page }) => {
    // Navigate to inventory page
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Verify each product has a valid price format (e.g., $XX.XX)
    const prices = await page.locator('[data-test^="item-"][data-test$="-price"]').allTextContents();
    const priceRegex = /^\$\d+\.\d{2}$/;
    
    for (const price of prices) {
      expect(price).toMatch(priceRegex);
    }
  });
});
