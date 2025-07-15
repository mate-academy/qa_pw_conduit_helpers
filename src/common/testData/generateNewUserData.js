import { faker } from '@faker-js/faker';

export function generateNewUserData() {
  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };

  user.username = user.username.toLowerCase();
  return user;
}
