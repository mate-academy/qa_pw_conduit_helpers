import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import {
  generateNewArticleData,
  generateArticleText,
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

test('Edit the article text for the existing article', async ({ page }) => {
  const updatedArticle = { ...article, text: generateArticleText() };

  await editArticle(page, updatedArticle);
  await viewArticlePage.reload();

  await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
});
