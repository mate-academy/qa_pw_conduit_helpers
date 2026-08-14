import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';

let viewArticlePage;
let article;
let homePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(1);
  homePage = new HomePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();

  await createNewArticle(page, article);

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});

test('Removing article tags', async ({ page }) => {
  const createArticlePage = new CreateArticlePage(page);
  await createArticlePage.clickEditArticle();
  await createArticlePage.removingArticleTags();
});
