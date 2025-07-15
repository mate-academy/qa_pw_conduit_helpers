import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(0);
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Create an article with required fields', async ({ page }) => {
  await createNewArticle(page, article);
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});
