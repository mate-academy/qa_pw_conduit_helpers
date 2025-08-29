import { faker } from '@faker-js/faker';

export function generateNewArticleData(tagNumber = 0) {
  const tags = Array.from({ length: tagNumber }, () => faker.lorem.word());

  const article = {
    title: faker.lorem.words(),
    newTitle: faker.lorem.words(3),
    description: faker.lorem.sentence(4),
    newDescription: faker.lorem.sentence(5),
    text: faker.lorem.sentences(2),
    newText: faker.lorem.sentences(2),
    tag1: faker.lorem.sentences(1),
    tag2: faker.lorem.sentences(1),
    tags,
  };

  return article;
}
