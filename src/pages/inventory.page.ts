import { Page,Locator,expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class InventoryPage extends BasePage {
    private readonly inventoryPageTitle:Locator;
    private readonly sortingDropDown: Locator;
    private  readonly inventoryprice: Locator;

    constructor (page:Page){
        super(page);
        this.inventoryPageTitle = page.locator('[data-test="title"]');
        this.sortingDropDown = page.locator('[data-test="product-sort-container"]')
        this.inventoryprice = page.locator('[data-test="inventory-item-price"]');
    }

    async changeSortingOrder(option:string){
        await expect(this.inventoryPageTitle).toContainText('Products')
        await this.sortingDropDown.selectOption(option);
    }

    async getPricedetails(){
        const texts = await this.inventoryprice.allTextContents();
        return texts.map(t=> parseFloat(t.replace('$','')));
    }
}