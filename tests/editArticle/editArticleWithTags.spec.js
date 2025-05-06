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
let tagName;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData(1);
  tagName = article.tags[0];

  const user = generateNewUserData();
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
});

test('Add the tag for the existing article with tags', async () => {
  await editArticlePage.goToEditArticlePage();

  const newTag = faker.lorem.word();

  await editArticlePage.editTagField(newTag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTagIsVisible(newTag);
});

test('Remove an article tag for the existing article with tag', async () => {
  await editArticlePage.goToEditArticlePage();
  await editArticlePage.deleteArticleTag(tagName);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTagIsHidden(tagName);
});
