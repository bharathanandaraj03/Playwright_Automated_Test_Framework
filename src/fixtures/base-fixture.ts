import {test as base} from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { BookingClient } from '../api/booking.client';
import { EnvConfig } from '../utils/env-loader';

type MyFixtures = {
    loginPage: LoginPage,
    inventoryPage : InventoryPage,
    cartPage: CartPage,
    checkoutPage: CheckoutPage
    bookingApi: BookingClient
}

type WorkerFixtures = {authToken: string};

export const test = base.extend<MyFixtures,WorkerFixtures>({

    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage:async({page},use) =>{
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    cartPage:async({page},use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage:async({page},use)=> {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    bookingApi: async ({request}, use)=>{
        const apiBookingClient = new BookingClient(request);
        await use(apiBookingClient);
    },

    authToken:[async ({playwright},use)=>{
        const ctx = await playwright.request.newContext({baseURL: EnvConfig.API_BASE_URL});
        const token = await new BookingClient(ctx).createToken(EnvConfig.API_USERNAME,EnvConfig.API_PASSWORD);
        await ctx.dispose();
        await use(token);
    },{scope:'worker'}]
});
