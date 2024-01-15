import { test, expect, } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ContactUs } from '../pages/contactUs';

test.describe('Sending a message', () => {
  test('should allow me to fill the contact us form', async ({ page }) => {
    const contactUs = new ContactUs(page);
    await contactUs.goto()
    const randomName = faker.person.firstName();
    contactUs.fillContact(randomName);
    expect(contactUs.name).toContainText(randomName);
  });
});


