import { faker } from '@faker-js/faker';

export function generateNewUserData() {
  const user = {
    username: `username_${faker.lorem.word()}_${faker.string.alpha(5)}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return user;
}
