import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { faker } from '@faker-js/faker';

let viewArticlePage;
let createArticlePage;
let article;
let newText;
let newTitle;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  article = generateNewArticleData();
  newText = faker.lorem.sentences(2);
  newTitle = faker.lorem.words();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit the article text for the existing article', async () => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.fillTextField(newText);
  await createArticlePage.fillTitleField(newTitle);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsNotVisible(newText);
});