import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { TITLE_CANNOT_BE_EMPTY, DESCRIPTION_CANNOT_BE_EMPTY, BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
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

test('Remove an article description for the existing article', async ({ page }) => {
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