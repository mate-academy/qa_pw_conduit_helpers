import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);

  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Add the tag for the existing article without tags', async ({ page }) => {
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTagField(article.tag);
  await viewArticlePage.clickUpdateArticleButton();

  await createArticlePage.assertTagTextIsVisible(article.tag);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});
