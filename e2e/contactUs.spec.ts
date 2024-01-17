import { test, expect, } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ContactUs } from '../pages/contactUs';

test.describe('Sending a message', () => {
  test('should allow me to fill the contact us form', async ({ page }) => {
    const contactUs = new ContactUs(page);
    const randomName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomCompany = faker.company.name();
    const randomEmail = faker.internet.email();
    const randomMessage = faker.lorem.text();

    await test.step('Navigating to contact us page', async () => {
      await contactUs.goto()
    });

    await test.step('Filling the contact us page', async () => {
      contactUs.fillContact(randomName, randomLastName, randomEmail, randomCompany, randomMessage);
    });

    await test.step('checking the filed is fullfilled', async () => {
      expect(contactUs.name).toHaveValue(randomName);
      expect(contactUs.lastName).toHaveValue(randomLastName);
      expect(contactUs.email).toHaveValue(randomEmail);
      expect(contactUs.company).toHaveValue(randomCompany);
      expect(contactUs.message).toHaveValue(randomMessage);
    });
    
  });
});


