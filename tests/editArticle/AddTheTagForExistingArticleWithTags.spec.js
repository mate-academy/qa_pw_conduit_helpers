import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { faker } from '@faker-js/faker';

let createArticlePage;
let viewArticlePage;
let homePage;
const newTag = faker.string.alpha(5);
let article;

test.beforeEach(async ({ page }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  homePage = new HomePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData(2);
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Add the tag to the article with tags', async () => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTagsField(newTag);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleToContainText(article.title);
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTagsToContainText(newTag);
  for (const tag of article.tags) {
    await viewArticlePage.assertArticleTagsToContainText(tag);
  }
});
