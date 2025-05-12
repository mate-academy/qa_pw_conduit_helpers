import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  article = generateNewArticleData();
  viewArticlePage = new ViewArticlePage(page);

  await signUpUser(page, user);
});

test('Create an article with required fields', async ({ page }) => {
  await createNewArticle(page, article);

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});
