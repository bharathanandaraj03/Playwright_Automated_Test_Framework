import {test} from '../../src/fixtures/base-fixture';
import { buildCheckoutUser } from '../../src/utils/data-factory';

test.describe('Perform end to end tests:', ()=> {
 test('Perform checkout for the application',async ({inventoryPage,cartPage,checkoutPage}) => {
   await inventoryPage.navigate('inventory.html')
   const addedItems = await inventoryPage.addFirstItemsToCart(2);
   await inventoryPage.openCart();
   await cartPage.verifyCartItems(addedItems);
   await cartPage.openCheckout();
   const user = buildCheckoutUser();
   await checkoutPage.enterCheckoutDetailsContinue(user.firstName, user.lastName, user.postalCode);
   await checkoutPage.verifyOverviewItems(addedItems);
   await checkoutPage.verifyOverviewTotals();
   await checkoutPage.finishCheckout();
 })
});