import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let homePage;
let createArticlePage;
let viewArticlePage;
let editArticlePage;
let article;
let newText = faker.lorem.words();

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);

  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);

  await homePage.clickNewArticleLink();

  await createNewArticle(page, article);
});

test('Edit the article text for the existing article', async () => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.editTextField(newText);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTextIsVisible(newText);
});
