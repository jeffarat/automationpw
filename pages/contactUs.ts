import { expect, type Locator, type Page } from '@playwright/test';


export class ContactUs {
    readonly page: Page;
    readonly name: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly company : Locator;
    readonly message: Locator;

    constructor(page: Page){
        this.page = page;
        this.name = page.locator(`input[placeholder='NAME']`);
        this.lastName = page.locator(`input[placeholder='LAST NAME']`);
        this.email = page.locator(`input[placeholder='EMAIL']`);
        this.company = page.locator(`input[placeholder='COMPANY']`);
        this.message = page.locator(`textarea[placeholder='YOUR MESSAGE']`);
    }

    async goto() {
        await this.page.goto('https://www.hexacta.com/contact/');
    }
    async fillContact(_name: string, _lastName: string, _email: string, _company: string, _message: string) {
        await this.name.fill(_name);
        await this.lastName.fill(_lastName);
        await this.email.fill(_email);
        await this.company.fill(_company);
        await this.message.fill(_message);
    }
}
