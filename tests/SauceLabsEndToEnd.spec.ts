import {test} from '../src/fixtures/base-fixture';

test.describe('Perform end to end tests: ',()=> {
 test('Perform checkout for the application',async ({page,inventoryPage,cartPage,checkoutPage}) => {
   await inventoryPage.navigate('inventory.html')
   const addedItems = await inventoryPage.addFirstItemsToCart(2);
   await inventoryPage.openCart();
   await cartPage.verifyCartItems(addedItems);
   await cartPage.openCheckout();
   await checkoutPage.enterCheckoutDetailsContinue("James","Bond","22323");
   await checkoutPage.verifyOverviewItems(addedItems);
   await checkoutPage.verifyOverviewTotals();
   await checkoutPage.finishCheckout();
 })
});