import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let homePage;
let createArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);

  await createNewArticle(page, article);
});

test('Remove an article tag for the existing article with tag', async ({
  page,
}) => {
  await createArticlePage.clickEditArticleButton();

  await createArticlePage.fillTagsField1(article.tag1);
  await createArticlePage.clickUpdateArticleButton();
  await page.waitForLoadState('networkidle');
  await createArticlePage.clickHomeButton();
  await createArticlePage.clickGlobalFeedButton();
  await expect(page.getByRole('link', { name: article.tag1 })).toBeVisible();
  await page.getByRole('link', { name: article.tag1 }).click();
  await createArticlePage.clickEditArticleButton();
  await page.waitForLoadState('networkidle');
  await createArticlePage.clickDeleteTagButton();
  await page.waitForLoadState('networkidle');
  await createArticlePage.clickUpdateArticleButton();
  await page.waitForLoadState('networkidle');
  await createArticlePage.clickHomeButton();
  await page.waitForLoadState('networkidle');
  await createArticlePage.clickGlobalFeedButton();
  await expect(
    page.getByRole('link', { name: article.tag1 }),
  ).not.toBeVisible();
});
