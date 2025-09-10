import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../src/ui/actions/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let homePage;
let viewArticlePage;
let article;
let editArticlePage;
let articleUrl;
let updatedArticle;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(3);
  editArticlePage = new EditArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);

  await homePage.clickNewArticleLink();
  await createArticle(page, article);
});

test('Edit tag for article if there tags', async ({ page }) => {
  articleUrl = page.url();
  await viewArticlePage.clickEditArticleButton();
  updatedArticle = generateNewArticleData(1);
  await editArticlePage.editArticleTags(updatedArticle);
  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL(articleUrl);
  await page.reload();
  await viewArticlePage.assertArticleTagsAreVisible(updatedArticle.tags);
});
