import { faker } from '@faker-js/faker';

export function generateNewUserData() {
  return {
      username: `${faker.person.firstName()}_${faker.person.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
  };
}
