import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/base-fixture';
import bookingData from '../../src/data/booking.json';
import { buildBooking } from '../../src/utils/data-factory';

test('create and fetch booking', async ({ bookingApi }) => {
  const bookingData = buildBooking();
  const createRes = await bookingApi.createBooking(bookingData);

  expect(createRes.status()).toBe(200);
  const { bookingid, booking } = await createRes.json();
  expect(booking).toEqual(bookingData);

  const getRes = await bookingApi.getBooking(bookingid);
  expect(await getRes.json()).toEqual(bookingData);
});

test('update booking needs token', async ({ bookingApi, authToken }) => {
   const { bookingid } = await (await bookingApi.createBooking(buildBooking())).json();
  const updated = buildBooking({ firstname: 'Jason' });   // fixed value you can assert on
  
  const res = await bookingApi.updateBooking(bookingid, updated, authToken);
  expect(res.status()).toBe(200);
  expect((await res.json()).firstname).toBe('Jason');
});

test('update booking without token is rejected', async ({ bookingApi }) => {
  const { bookingid } = await (await bookingApi.createBooking(bookingData)).json();
  const res = await bookingApi.updateBooking(bookingid, bookingData, 'invalid-token');
  expect(res.status()).toBe(403);
});

