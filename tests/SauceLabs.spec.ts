import { test, expect } from '@playwright/test';
import { EnvConfig} from '../src/utils/env-loader';


test('test', async ({ page }) => {
  await page.goto(EnvConfig.BASE_URL);
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="password"]').press('Enter');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="item-4-title-link"]').click();
  await page.locator('div').filter({ hasText: /^Open Menu$/ }).nth(1).click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});