import { chromium,FullConfig } from "@playwright/test";
import { EnvConfig } from "./env-loader";

async function globalsetUp(config: FullConfig){
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("Performin Global authedication setup")

    await page.goto(EnvConfig.BASE_URL)

// Perform login actions for standard user
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Wait until logged in (e.g., URL changes to inventory)
  await page.waitForURL(/.*inventory.html/);
  await context.storageState({path: 'src/data/auth.json'});
}

export default globalsetUp;