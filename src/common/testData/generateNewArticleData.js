import { faker } from '@faker-js/faker';

export function generateNewArticleData(tagNumber = 0) {
    const tags = Array.from(
    { length: tagNumber },
    () => faker.lorem.word(),
  );

  const article = {
    title: faker.lorem.words(),
    newTitle: faker.lorem.words(),
    description: faker.lorem.sentence(4),
    newDescription: faker.lorem.sentence(8),
    text: faker.lorem.sentences(2),
    newText: faker.lorem.sentences(5),
    tags,
    newTag: `tag-${faker.string.alphanumeric(8)}`,
  };

  return article;
}
