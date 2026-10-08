import { Page,Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage{
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;

    constructor(page:Page){
        super(page)
        this.userNameInput = page.locator('[data-test="username"]')
        this.passwordInput = page.locator('[data-test="password"]')
    }

    async login(userName:string, password:string){
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.passwordInput.press('Enter');
    }
}