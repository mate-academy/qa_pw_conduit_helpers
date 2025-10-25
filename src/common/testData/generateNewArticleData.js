import { faker } from '@faker-js/faker';

export function generateNewArticleData() {
  
  const article = {
    title: faker.lorem.words(),
    description: faker.lorem.sentence(4),
    text: faker.lorem.sentences(2),
    tags: faker.lorem.sentence().split(' '),
  };

  return article;
}
