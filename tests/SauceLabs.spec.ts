import { expect } from '@playwright/test';
import {test} from '../src/fixtures/base-fixture'
import inventoryData from "../src/data/inventory.json"

test.describe('Sauce Demo Regression test',() =>{
  test('Validate Item Price Sorting order High to Low & Low to High', async ({page,inventoryPage}) =>{
    await inventoryPage.navigate('/inventory.html')
    await inventoryPage.changeSortingOrder(inventoryData.sortorderoptions.HightoLow);
    const priceDetailsHiLo = await inventoryPage.getPricedetails();
    const expectedHiLo =[...priceDetailsHiLo].sort((a,b) => b-a)
    expect(priceDetailsHiLo).toEqual(expectedHiLo);

    await inventoryPage.changeSortingOrder(inventoryData.sortorderoptions.LowtoHigh);
    const priceDetailsLoHi=await inventoryPage.getPricedetails();
    const expectedLoHi =[...priceDetailsHiLo].sort((a,b) => a-b)
    expect(priceDetailsLoHi).toEqual(expectedLoHi);
  })

    test('Validate Sorting order Item Price A to Z and Z to A', async ({page,inventoryPage}) =>{
    await inventoryPage.navigate('/inventory.html')
    await inventoryPage.changeSortingOrder('za')
    const names = await inventoryPage.getItemNames()
    const expected = [...names].sort((a, b) => b.localeCompare(a))   // Z→A; a.localeCompare(b) for A→Z ('az')
    expect(names).toEqual(expected)
  })

  test('Validate first two items are added to cart', async ({page,inventoryPage,cartPage}) =>{
    await inventoryPage.navigate('/inventory.html')
    const addedItems = await inventoryPage.addFirstItemsToCart(2);

    expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    await inventoryPage.openCart();
    await cartPage.verifyCartPage();
    await cartPage.verifyCartItems(addedItems);
  })

  test('Validate cart count updates on add and remove', async ({inventoryPage}) =>{
    await inventoryPage.navigate('/inventory.html')
    await inventoryPage.expectCartBadgeCount(0);

    await inventoryPage.addFirstItemsToCart(3);
    await inventoryPage.expectCartBadgeCount(3);

    await inventoryPage.removeItemAt(0);
    await inventoryPage.expectCartBadgeCount(2);

    await inventoryPage.removeItemAt(1);
    await inventoryPage.expectCartBadgeCount(1);

    await inventoryPage.removeItemAt(2);
    await inventoryPage.expectCartBadgeCount(0);
  })

});
