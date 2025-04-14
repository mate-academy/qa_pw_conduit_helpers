import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let createArticlePage;
let viewArticlePage;
const newTitle = 'New title';

test.beforeEach(async ({ page }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  const user = generateNewUserData();
  const article = generateNewArticleData();
  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Edit the article title for the existing article', async () => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTitleField(newTitle);
  await createArticlePage.clickPublishArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});
