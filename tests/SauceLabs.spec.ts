import { expect } from '@playwright/test';
import {test} from '../src/fixtures/base-fixture'
import userdata from "../src/data/users.json"


test.describe('Sauce Demo login suite',() =>{
  test('should login sucessfully with valid credentials', async ({page,loginPage}) => {
    await loginPage.navigate('/')
    await loginPage.login(userdata[0].username,userdata[0].password)
    //await loginPage.login('standard_user','secret_sauce' )
    await expect(page).toHaveURL(/.*inventory.html/)
  })
});


/*test('test', async ({ page }) => {
  await page.goto(EnvConfig.BASE_URL);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="item-4-title-link"]').click();
  await page.locator('div').filter({ hasText: /^Open Menu$/ }).nth(1).click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});*/