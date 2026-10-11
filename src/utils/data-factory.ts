import { faker } from '@faker-js/faker';
import { Booking } from '../api/booking.client';

export interface CheckoutUser {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export function buildCheckoutUser(): CheckoutUser {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode('#####'),
  };
}

// overrides let a test pin specific fields: buildBooking({ firstname: 'Jason' })
export function buildBooking(overrides: Partial<Booking> = {}): Booking {
  const checkin = faker.date.soon({ days: 30 });
  const checkout = faker.date.soon({ days: 10, refDate: checkin });
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 50, max: 1000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: checkin.toISOString().split('T')[0],     // API expects YYYY-MM-DD
      checkout: checkout.toISOString().split('T')[0],
    },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Late checkout']),
    ...overrides,
  };
}
