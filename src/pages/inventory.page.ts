import { Page,Locator,expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class InventoryPage extends BasePage {
    private readonly inventoryPageTitle:Locator;
    private readonly sortingDropDown: Locator;
    private readonly inventoryprice: Locator;
    private readonly inventoryNames: Locator;
    private readonly inventoryItems: Locator;
    private readonly cartBadge: Locator;
    private readonly cartLink: Locator;

    constructor (page:Page){
        super(page);
        this.inventoryPageTitle = page.locator('[data-test="title"]');
        this.sortingDropDown = page.locator('[data-test="product-sort-container"]')
        this.inventoryprice = page.locator('[data-test="inventory-item-price"]');
        this.inventoryNames = page.locator('[data-test="inventory-item-name"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async changeSortingOrder(option:string){
        await expect(this.inventoryPageTitle).toContainText('Products')
        await this.sortingDropDown.selectOption(option);
    }

    async getPricedetails(): Promise<any[]>{
        const texts = await this.inventoryprice.allTextContents();
        return texts.map(t=> parseFloat(t.replace('$','')));
    }

    async getItemNames(): Promise<string[]>{
        return (await this.inventoryNames.allTextContents()).map(n => n.trim());
    }

    async addFirstItemsToCart(count: number): Promise<string[]> {
        const addedNames: string[] = [];
        for (let i = 0; i < count; i++) {
            const item = this.inventoryItems.nth(i);
            addedNames.push((await item.locator('[data-test="inventory-item-name"]').innerText()).trim());
            await item.getByRole('button', { name: 'Add to cart' }).click();
            await expect(item.getByRole('button', { name: 'Remove' })).toBeVisible();
        }
        return addedNames;
    }

    async getCartBadgeCount(): Promise<number> {
        return parseInt(await this.cartBadge.innerText(), 10);
    }

    async removeItemAt(index: number){
        const item = this.inventoryItems.nth(index);
        await item.getByRole('button', { name: 'Remove' }).click();
        await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    }

    async expectCartBadgeCount(count: number){
        if (count === 0) {
            await expect(this.cartBadge).toBeHidden();
        } else {
            await expect(this.cartBadge).toHaveText(String(count));
        }
    }

    async openCart(){
        await this.cartLink.click();
    }
}