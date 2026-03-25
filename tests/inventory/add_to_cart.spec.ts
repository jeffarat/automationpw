// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { Login } from "../../pages/Login";
import { Inventory } from "../../pages/Inventory";
import userData from "../../data/loginData.json";

test.describe("Add to Cart Functionality", () => {
  let inventory: Inventory;

  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    inventory = new Inventory(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillUsername(userData.credentials.username);
    await loginPage.fillPassword(userData.credentials.password);
    await loginPage.clickOnLoginButton();
  });

  test("Add single product to cart", async () => {
    await test.step("Click Add to cart on Sauce Labs Backpack", async () => {
      await inventory.addProductToCart("sauce-labs-backpack");
    });

    await test.step("Verify cart badge shows 1", async () => {
      await expect(inventory.cartBadge).toContainText("1");
    });

    await test.step("Verify button changes to Remove", async () => {
      await expect(inventory.removeButton("sauce-labs-backpack")).toBeVisible();
    });
  });

  test("Add multiple different products to cart", async () => {
    await test.step("Add three products to cart", async () => {
      await inventory.addProductToCart("sauce-labs-backpack");
      await inventory.addProductToCart("sauce-labs-bike-light");
      await inventory.addProductToCart("sauce-labs-bolt-t-shirt");
    });

    await test.step("Verify cart badge shows 3", async () => {
      await expect(inventory.cartBadge).toContainText("3");
    });
  });

  test("Remove product from cart on inventory page", async () => {
    await test.step("Add item to cart", async () => {
      await inventory.addProductToCart("sauce-labs-backpack");
    });

    await test.step("Verify Remove button is displayed", async () => {
      await expect(inventory.removeButton("sauce-labs-backpack")).toBeVisible();
    });

    await test.step("Click Remove button", async () => {
      await inventory.removeProductFromCart("sauce-labs-backpack");
    });

    await test.step("Verify cart badge disappears", async () => {
      await expect(inventory.cartBadge).not.toBeVisible();
    });

    await test.step("Verify button reverts to Add to cart", async () => {
      await expect(
        inventory.addToCartButton("sauce-labs-backpack"),
      ).toBeVisible();
    });
  });

  test("Add to cart then remove from cart", async () => {
    await test.step("Add Sauce Labs Onesie to cart", async () => {
      await inventory.addProductToCart("sauce-labs-onesie");
    });

    await test.step("Verify button changes to Remove", async () => {
      await expect(inventory.removeButton("sauce-labs-onesie")).toBeVisible();
    });

    await test.step("Remove Sauce Labs Onesie from cart", async () => {
      await inventory.removeProductFromCart("sauce-labs-onesie");
    });

    await test.step("Verify button changes back to Add to cart", async () => {
      await expect(
        inventory.addToCartButton("sauce-labs-onesie"),
      ).toBeVisible();
    });

    await test.step("Add it back to cart", async () => {
      await inventory.addProductToCart("sauce-labs-onesie");
      await expect(inventory.removeButton("sauce-labs-onesie")).toBeVisible();
    });
  });
});
