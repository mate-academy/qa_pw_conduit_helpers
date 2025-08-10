import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let homePage;
let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(3);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Remove an article title for the existing article', async ({ page }) => {
  const updatedArticle = { 
    title: '',
    description: faker.lorem.sentence(4),
    text: faker.lorem.sentences(2),
    tags: [] 
  }; 
  
  await editArticle(page, article, updatedArticle);

  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article desctiption for the existing article', async ({ page }) => {
  const updatedArticle = { 
    title: faker.lorem.words(),
    description: '',
    text: faker.lorem.sentences(2),
    tags: [] 
  }; 
  
  await editArticle(page, article, updatedArticle);

  await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Remove an article text for the existing article', async ({ page }) => {
  const updatedArticle = { 
    title: faker.lorem.words(),
    description: faker.lorem.sentence(4),
    text: '',
    tags: [] 
  }; 
  
  await editArticle(page, article, updatedArticle);

  await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});

test('Remove an article tag for the existing article', async ({ page }) => {
  const updatedArticle = { 
    title: faker.lorem.words(),
    description: faker.lorem.sentence(4),
    text: faker.lorem.sentence(4),
    tags: [] 
  }; 
  
  await editArticle(page, article, updatedArticle, true);
  if (article.tags && article.tags.length > 0) {
    for (const tag of article.tags) {
      await viewArticlePage.assertArticleTagIsNotVisible(tag);
    }
  }
});