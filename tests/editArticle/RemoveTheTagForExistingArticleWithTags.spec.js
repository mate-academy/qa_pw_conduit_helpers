import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../src/ui/pages/HomePage';

let createArticlePage;
let viewArticlePage;
let homePage;
let article;
let tagRemoved;
let tagLeft;

test.beforeEach(async ({ page }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  homePage = new HomePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData(2);
  tagRemoved = article.tags[0];
  tagLeft = article.tags[1];
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Remove the tag for the existing article with tags', async () => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.removeTagFromTagList(tagRemoved);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleToContainText(article.title);
  await viewArticlePage.reload()
  await viewArticlePage.assertArticleTagsToContainText(tagLeft);
  await viewArticlePage.assertArticleTagsNotToContainText(tagRemoved);
});
