import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { DESCRIPTION_CANNOT_BE_EMPTY, TITLE_CANNOT_BE_EMPTY, BODY_CANNOT_BE_EMPTY} from '../../src/ui/constants/articleErrorMessages';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Create an article without title', async ({ page }) => {
  const article = { 
    title: '', 
    description: faker.lorem.sentence(4), 
    text: faker.lorem.sentence(4), 
    tags: ['test1', 'test2', 'test3'] 
  }; 

  await createNewArticle(page, article);

  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Create an article without description', async ({ page }) => {
  const article = { 
    title: faker.lorem.words(), 
    description: '', 
    text: faker.lorem.sentence(4), 
    tags: ['test1', 'test2', 'test3'] 
  }; 

  await createNewArticle(page, article);

  await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Create an article without text', async ({ page }) => {
  const article = { 
    title: faker.lorem.words(), 
    description: faker.lorem.sentence(4), 
    text: '', 
    tags: ['test1', 'test2', 'test3'] 
  }; 

  await createNewArticle(page, article);

  await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
