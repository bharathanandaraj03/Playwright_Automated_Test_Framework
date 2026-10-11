# Playwright Automated Test Framework

TypeScript + Playwright framework with UI tests for [Sauce Demo](https://www.saucedemo.com/) (Page Object Model) and API tests for [Restful Booker](https://restful-booker.herokuapp.com/apidoc/index.html) (API client model).

| Topic | Details |
|---|---|
| Install | `npm install` then `npx playwright install` |
| Environment config | Create `config/.env.<ENV>` (default `qa`, git-ignored) with `BASE_URL`, `TIMEOUT`, `HEADLESS`, `API_BASE_URL`, `API_USERNAME`, `API_PASSWORD`; loaded by `src/utils/env-loader.ts` |
| Run all tests | `npx playwright test` |
| Run UI / API only | `npx playwright test --project=chromium` / `npx playwright test --project=api` |
| Run one test | `npx playwright test -g "<test name>"` |
| Report & debugging | `npx playwright show-report`; failed tests keep trace, screenshot and video (`trace: 'retain-on-failure'`). In CI, download the `playwright-report` artifact and open it the same way |
| UI login | `src/utils/golbal-setup.ts` logs in once and saves the session to `src/data/auth.json`; UI tests reuse it via `storageState` |
| UI page objects | `src/pages/`: `BasePage` (shared `navigate`, `getTitle`) extended by `LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage` |
| API client | `src/api/booking.client.ts`: `BookingClient` wraps `/auth` and `/booking` (`createToken`, `getBooking`, `createBooking`, `updateBooking`, `deleteBooking`); returns raw `APIResponse` so tests assert status |
| Fixtures | `src/fixtures/base-fixture.ts`: page objects (`loginPage`, `inventoryPage`, `cartPage`, `checkoutPage`), `bookingApi`, and worker-scoped `authToken` (one `/auth` call per worker). Import `test` from here, not `@playwright/test` |
| Test data | `src/data/users.json`, `src/data/inventory.json`, `src/data/booking.json` |
| Tests | `tests/ui/`: sorting, add to cart, cart count, end-to-end checkout. `tests/api/`: create/fetch booking, update with token, update rejected without valid token (403) |
| Extend | UI: add a class in `src/pages/` extending `BasePage`. API: add a client in `src/api/`. Register either in `base-fixture.ts` and use it as a test argument |
