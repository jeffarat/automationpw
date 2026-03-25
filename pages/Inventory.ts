import { type Locator, type Page } from "@playwright/test";

export class Inventory {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.productTitles = page.locator(
      '[data-test^="item-"][data-test$="-title-link"]',
    );
    this.productPrices = page.locator(
      '[data-test^="item-"][data-test$="-price"]',
    );
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async gotoInventory() {
    await this.page.goto("/inventory.html");
  }

  async sortBy(option: "az" | "za" | "lohi" | "hilo") {
    await this.sortDropdown.selectOption(option);
  }

  async addProductToCart(productSlug: string) {
    await this.page
      .locator(`[data-test="add-to-cart-${productSlug}"]`)
      .click();
  }

  async removeProductFromCart(productSlug: string) {
    await this.page
      .locator(`[data-test="remove-${productSlug}"]`)
      .click();
  }

  addToCartButton(productSlug: string): Locator {
    return this.page.locator(`[data-test="add-to-cart-${productSlug}"]`);
  }

  removeButton(productSlug: string): Locator {
    return this.page.locator(`[data-test="remove-${productSlug}"]`);
  }

  async clickCart() {
    await this.cartLink.click();
  }

  async clickProductTitle(itemId: number) {
    await this.page.locator(`[data-test="item-${itemId}-title-link"]`).click();
  }

  async clickProductImage(altText: string) {
    await this.page.locator(`img[alt="${altText}"]`).first().click();
  }

  async openMenu() {
    await this.page.getByRole("button", { name: /open menu/i }).click();
  }

  async closeMenu() {
    await this.page.getByRole("button", { name: /close menu/i }).click();
  }

  menuLink(name: string): Locator {
    return this.page.getByRole("link", { name: new RegExp(name, "i") });
  }

  async getProductTitleTexts(): Promise<string[]> {
    return this.productTitles.allTextContents();
  }

  async getProductPriceTexts(): Promise<string[]> {
    return this.productPrices.allTextContents();
  }

  async getProductPriceValues(): Promise<number[]> {
    const texts = await this.getProductPriceTexts();
    return texts.map((p) => parseFloat(p.replace("$", "")));
  }
}
