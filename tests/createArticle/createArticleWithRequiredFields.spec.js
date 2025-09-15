import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let homePage;
let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  // article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Creat an article with required fields and with tags', async () => {
  article = generateNewArticleData(3);
  await createNewArticle(homePage.page, article);
});

test('Creat an article with required fields and without tags', async () => {
  article = generateNewArticleData(0);
  await createNewArticle(homePage.page, article);
});
