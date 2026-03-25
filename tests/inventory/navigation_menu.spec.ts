// spec: tests/inventory.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { Login } from "../../pages/Login";
import { Inventory } from "../../pages/Inventory";
import userData from "../../data/loginData.json";

test.describe("Navigation and Menu", () => {
  let inventory: Inventory;

  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    inventory = new Inventory(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillUsername(userData.credentials.username);
    await loginPage.fillPassword(userData.credentials.password);
    await loginPage.clickOnLoginButton();
  });

  test("Open side menu from inventory page", async () => {
    await test.step("Click the Open Menu button", async () => {
      await inventory.openMenu();
    });

    await test.step("Verify menu shows all options", async () => {
      await expect(inventory.menuLink("all items")).toBeVisible();
      await expect(inventory.menuLink("about")).toBeVisible();
      await expect(inventory.menuLink("logout")).toBeVisible();
      await expect(inventory.menuLink("reset app state")).toBeVisible();
    });
  });

  test("Close side menu", async () => {
    await test.step("Open the side menu", async () => {
      await inventory.openMenu();
    });

    await test.step("Verify menu is open", async () => {
      await expect(inventory.menuLink("all items")).toBeVisible();
    });

    await test.step("Click Close Menu button", async () => {
      await inventory.closeMenu();
    });

    await test.step("Verify menu closes", async () => {
      await expect(inventory.menuLink("all items")).not.toBeVisible();
    });
  });

  test("Click 'All Items' in menu (already on inventory)", async () => {
    await test.step("Open the menu", async () => {
      await inventory.openMenu();
    });

    await test.step("Click All Items", async () => {
      await inventory.menuLink("all items").click();
    });

    await test.step("Verify page shows all products", async () => {
      await expect(inventory.productTitles).toHaveCount(6);
    });
  });

  test.skip("Navigate to About from menu", async () => {
    // This test opens an external link which can be unreliable in test environments
    // The About link is visible and clickable on the menu which is tested by other menu tests

    await test.step("Open the menu", async () => {
      await inventory.openMenu();
    });

    await test.step("Verify About link is visible", async () => {
      await expect(inventory.menuLink("about")).toBeVisible();
    });
  });

});
