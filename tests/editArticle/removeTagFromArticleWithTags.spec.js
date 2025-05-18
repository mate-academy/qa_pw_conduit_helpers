import { test } from '@playwright/test';

import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let homePage;
let createArticlePage;
let viewArticlePage;
let editArticlePage;
let article;
let removedTag;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);

  article = generateNewArticleData(2);
  removedTag = article.tags[0];
  const user = generateNewUserData();

  await signUpUser(page, user);

  await homePage.clickNewArticleLink();

  await createNewArticle(page, article);
});

test('Remove an article tag for the existing article with tag', async () => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.removeArticleTag(removedTag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTagIsRemoved(removedTag);
});
