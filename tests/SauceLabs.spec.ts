import { expect } from '@playwright/test';
import {test} from '../src/fixtures/base-fixture'
import userdata from "../src/data/users.json"
import {InventoryPage} from '../src/pages/inventory.page'

test.describe('Sauce Demo login suite',() =>{
  test('should login sucessfully with valid credentials', async ({page,loginPage}) => {
    await loginPage.navigate('/')
    await loginPage.login(userdata[0].username,userdata[0].password)
    
  }),

  test('Validate Item Price High to Low & Low to High Sorting order', async ({page,inventoryPage}) =>{
    await inventoryPage.navigate('/inventory.html')
    await inventoryPage.changeSortingOrder('hilo');
    const priceDetailsHiLo = await inventoryPage.getPricedetails();
    const expectedHiLo =[...priceDetailsHiLo].sort((a,b) => b-a)
    expect(priceDetailsHiLo).toEqual(expectedHiLo);

    await inventoryPage.changeSortingOrder('lohi');
    const priceDetailsLoHi=await inventoryPage.getPricedetails();
    const expectedLoHi =[...priceDetailsHiLo].sort((a,b) => a-b)
    expect(priceDetailsLoHi).toEqual(expectedLoHi);
  })

});