import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import {
  generateNewArticleData,
  generateArticleTitle,
} from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit the article title for the existing article', async ({ page }) => {
  const updatedArticle = { ...article, title: generateArticleTitle() };

  await editArticle(page, updatedArticle);
  await viewArticlePage.reload();

  await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
});
