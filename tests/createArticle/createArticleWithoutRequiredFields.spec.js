import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';


let homePage;
let createArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData();

  await signUpUser(page, user);
});

test('Create an article without required fields', async ({ page }) => {
  await homePage.clickNewArticleLink();
  
  delete article.title;
  await createNewArticle(page, article);

  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
