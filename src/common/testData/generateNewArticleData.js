import { faker } from '@faker-js/faker';

export function generateNewArticleData({ tagsCount = 0 } = {}) {
  return {
    title: faker.lorem.sentence(3),
    description: faker.lorem.sentence(5),
    text: faker.lorem.paragraph(),
    tags: faker.helpers.multiple(
      () => faker.lorem.word() + faker.string.alphanumeric(5),
      { count: tagsCount },
    ),
  };
}
