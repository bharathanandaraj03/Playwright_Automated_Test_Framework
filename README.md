# Playwright Automated Test Framework

TypeScript + Playwright framework for [Sauce Demo](https://www.saucedemo.com/), built on the Page Object Model.

| Topic | Details |
|---|---|
| Install | `npm install` then `npx playwright install` |
| Run all tests | `npx playwright test` |
| Run one test | `npx playwright test -g "<test name>"` |
| Run for an environment | `npm run test:qa` (requires `npm install -D cross-env`) |
| Report | `npx playwright show-report` |
| Environment config | `config/.env.<ENV>` (default `qa`) loaded by `src/utils/env-loader.ts`: `BASE_URL`, `TIMEOUT`, `HEADLESS` |
| Login | `src/utils/golbal-setup.ts` logs in once and saves session to `src/data/auth.json`; all tests reuse it via `storageState` |
| Page objects | `src/pages/`: `BasePage` (shared `navigate`, `getTitle`) extended by `LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage` |
| Fixtures | `src/fixtures/base-fixture.ts` injects page objects into tests (`{ loginPage, inventoryPage, cartPage }`) |
| Test data | `src/data/users.json`, `src/data/inventory.json` |
| Tests | `tests/SauceLabs.spec.ts`: price sort, name sort, add to cart, cart count on add/remove |
| Add a page | Create class in `src/pages/` extending `BasePage`, register it in `base-fixture.ts`, use it as a test argument |
