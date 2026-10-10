import { Locator, Page,expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage{

    private cartitems : Locator;
    private checkoutBtn : Locator;

constructor(page:Page) {
    super(page);
    this.cartitems = page.locator('[data-test="inventory-item-name"]');
    this.checkoutBtn = page.locator('#checkout')
}

async verifyCartPage(){
        await expect(this.page).toHaveURL(/.*cart.html/);
}
async verifyCartItems(expectedItems: string[]){
    await expect(this.cartitems).toHaveText(expectedItems);
}

async openCheckout(){
    await this.checkoutBtn.click();
}

}