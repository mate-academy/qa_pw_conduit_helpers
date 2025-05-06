import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
let viewArticlePage;
let editArticlePage;
let article;
let newTag = faker.lorem.word();

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData();

  const user = generateNewUserData();
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
});

test('Add the tag for the existing article without tags', async () => {
  await editArticlePage.open();
  await editArticlePage.editTagField(newTag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTagIsVisible(newTag);
});


