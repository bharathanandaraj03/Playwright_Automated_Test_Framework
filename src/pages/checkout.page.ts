import { BasePage } from "./base.page";
import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage extends BasePage{
    private firstName : Locator;
    private lastName: Locator;
    private zipPostCode : Locator;
    private continueBtn : Locator;
    private finishBtn : Locator;
    private overviewItemNames : Locator;
    private overviewItemPrices : Locator;
    private subtotalLabel : Locator;
    private taxLabel : Locator;
    private totalLabel : Locator;
    private completeHeader : Locator;

    constructor(page: Page){
        super(page);
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.zipPostCode = page.locator('#postal-code');
        this.continueBtn = page.locator('#continue');
        this.finishBtn = page.locator('#finish');
        this.overviewItemNames = page.locator('[data-test="inventory-item-name"]');
        this.overviewItemPrices = page.locator('[data-test="inventory-item-price"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
    }

    async enterCheckoutDetailsContinue(firstName:string, lastname:string, zipPostCode:string){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastname);
        await this.zipPostCode.fill(zipPostCode);
        await this.continueBtn.click();
    }

    async verifyOverviewItems(expectedItems: string[]){
        await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
        await expect(this.overviewItemNames).toHaveText(expectedItems);
    }

    async verifyOverviewTotals(){
        const prices = (await this.overviewItemPrices.allTextContents()).map(p => this.toAmount(p));
        const itemTotal = prices.reduce((sum, p) => sum + p, 0);
        const subtotal = this.toAmount(await this.subtotalLabel.innerText());
        const tax = this.toAmount(await this.taxLabel.innerText());
        const total = this.toAmount(await this.totalLabel.innerText());

        // toBeCloseTo(x, 2) avoids floating-point mismatches like 39.980000000000004
        expect(subtotal).toBeCloseTo(itemTotal, 2);
        expect(total).toBeCloseTo(subtotal + tax, 2);
    }

    async finishCheckout(){
        await this.finishBtn.click();
        await expect(this.page).toHaveURL(/.*checkout-complete.html/);
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }

    // "Item total: $39.98" -> 39.98
    private toAmount(text: string): number {
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    }
}
