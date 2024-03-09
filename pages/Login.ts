import { type Locator, type Page } from "@playwright/test";

export class Login {
    readonly page: Page;
    readonly username : Locator;
    readonly password : Locator;
    readonly loginButton: Locator;


    constructor(page: Page){
        this.page = page;
        this.username = page.locator('[data-test="username"]')
        this.password = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
    }

    async gotoLoginPage() {
        await this.page.goto("https://www.saucedemo.com/");
      }

    async fillUsername(user: string){
        await this.username.fill(user);
    }
    async fillPassword(pass: string){
        await this.password.fill(pass);
    }
    async clickOnLoginButton(){
        await this.loginButton.click();
    }
}