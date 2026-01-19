// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Product Display and Filtering", () => {
  test("Display all products on inventory page", async ({ page }) => {
    // Navigate to the inventory page (login if necessary using standard_user/secret_sauce)
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Verify that all 6 products are displayed on the page
    const products = await page
      .locator('[data-test^="item-"][data-test$="-title-link"]')
      .all();
    expect(products.length).toBe(6);

    // Verify each product shows: product name, description, price, and add to cart button
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

      // Verify description, price, and add to cart button exist
      const productContainer = productLink.locator("..").locator("..");
      await expect(productContainer.locator("text=/.*/").first()).toBeVisible();
      await expect(
        productContainer.locator('[data-test*="price"]'),
      ).toBeVisible();
      await expect(
        productContainer.locator('button:has-text("Add to cart")'),
      ).toBeVisible();
    }
  });
});
