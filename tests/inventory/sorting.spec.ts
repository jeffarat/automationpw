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

  test("Sort products by name A to Z", async () => {
    await test.step("Verify sort dropdown defaults to A-Z", async () => {
      await expect(inventory.sortDropdown).toBeVisible();
      await expect(inventory.sortDropdown).toHaveValue("az");
    });

    await test.step("Verify products are sorted alphabetically A to Z", async () => {
      const productTitles = await inventory.getProductTitleTexts();
      const sortedTitles = [...productTitles].sort();
      expect(productTitles).toEqual(sortedTitles);
    });
  });

  test("Sort products by name Z to A", async () => {
    await test.step("Select Z to A sort option", async () => {
      await inventory.sortBy("za");
    });

    await test.step("Verify products are in reverse alphabetical order", async () => {
      const productTitles = await inventory.getProductTitleTexts();
      const reverseSorted = [...productTitles].sort().reverse();
      expect(productTitles).toEqual(reverseSorted);
    });
  });

  test("Sort products by price low to high", async () => {
    await test.step("Select price low to high sort option", async () => {
      await inventory.sortBy("lohi");
    });

    await test.step("Verify products are sorted by ascending price", async () => {
      const priceValues = await inventory.getProductPriceValues();
      const sortedPrices = [...priceValues].sort((a, b) => a - b);
      expect(priceValues).toEqual(sortedPrices);
    });
  });

  test("Sort products by price high to low", async () => {
    await test.step("Select price high to low sort option", async () => {
      await inventory.sortBy("hilo");
    });

    await test.step("Verify products are sorted by descending price", async () => {
      const priceValues = await inventory.getProductPriceValues();
      const sortedPrices = [...priceValues].sort((a, b) => b - a);
      expect(priceValues).toEqual(sortedPrices);
    });
  });

  test("Verify product prices are displayed correctly", async () => {
    await test.step("Verify each product has a valid price format", async () => {
      const prices = await inventory.getProductPriceTexts();
      const priceRegex = /^\$\d+\.\d{2}$/;

      for (const price of prices) {
        expect(price).toMatch(priceRegex);
      }
    });
  });
});
