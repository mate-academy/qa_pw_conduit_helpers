import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticleWithTag } from '../../src/ui/actions/article/createNewArticle';
import { editArticleWithTag } from '../../src/ui/actions/article/editArticle';

let homePage;
let createArticlePage;
let viewArticlePage;
let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticleWithTag(homePage.page, article);
});

test('Edit an article with tag', async () => {
    await editArticleWithTag(homePage.page, article);
});