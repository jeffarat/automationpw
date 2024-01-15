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
        this.name = page.locator(`input[placeholder='NAME']`)
    }

    async goto() {
        await this.page.goto('https://www.hexacta.com/contact/');
    }
    async fillContact(name: string) {
        await this.name.fill(name);
    }

}
