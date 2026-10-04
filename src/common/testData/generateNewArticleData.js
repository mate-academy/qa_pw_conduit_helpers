import { faker } from '@faker-js/faker';

export function generateArticleTitle() {
  return faker.lorem.words();
}

export function generateArticleDescription() {
  return faker.lorem.sentence(4);
}

export function generateArticleText() {
  return faker.lorem.sentences(2);
}

export function generateArticleTag() {
  return faker.lorem.word();
}

export function generateArticleTags(tagNumber = 1) {
  return faker.helpers.uniqueArray(faker.lorem.word, tagNumber);
}

export function generateNewArticleData(tagNumber = 0) {
  const article = {
    title: generateArticleTitle(),
    description: generateArticleDescription(),
    text: generateArticleText(),
    tags: generateArticleTags(tagNumber),
  };

  return article;
}
