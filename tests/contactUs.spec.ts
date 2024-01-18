import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { ContactUs } from "../pages/contactUs";

test.describe("Contact us form", () => {
  test("should allow me to fill the contact us form", async ({ page }) => {
    const contactUs = new ContactUs(page);
    const randomName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomCompany = faker.company.name();
    const randomEmail = faker.internet.email();
    const randomMessage = faker.lorem.text();

    await test.step("Navigating to contact us page", async () => {
      await contactUs.goto();
    });

    await test.step("Filling the contact us page", async () => {
      await contactUs.fillContact(
        randomName,
        randomLastName,
        randomEmail,
        randomCompany,
        randomMessage
      );
    });

    await test.step("checking the form is fullfilled", async () => {
      await expect(contactUs.name).toHaveValue(randomName);
      await expect(contactUs.lastName).toHaveValue(randomLastName);
      await expect(contactUs.email).toHaveValue(randomEmail);
      await expect(contactUs.company).toHaveValue(randomCompany);
      await expect(contactUs.message).toHaveValue(randomMessage);
    });
  });
});
