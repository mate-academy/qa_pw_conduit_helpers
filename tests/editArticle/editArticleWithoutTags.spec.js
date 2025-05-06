import { expect, test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { faker } from '@faker-js/faker';
import {
  TITLE_CANNOT_BE_EMPTY,
  ARTICLE_DESCRIPTION_CANNOT_BE_EMPTY,
  ARTICLE_BODY_CANNOT_BE_EMPTY
} from '../../src/ui/constants/articleErrorMessages';

let homePage;
let createArticlePage;
let viewArticlePage;
let editArticlePage;
let article;

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

test('Edit the article title for the existing article', async () => {
  await editArticlePage.goToEditArticlePage();

  const newTitle = faker.lorem.words();

  await editArticlePage.editArticleTitleField(newTitle);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});

test('Remove an article title for the existing article', async () => {
  await editArticlePage.goToEditArticlePage();
  await editArticlePage.deleteArticleTitleValue();
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Edit the article description for the existing article', async () => {
  await editArticlePage.goToEditArticlePage();

  const newDescription = faker.lorem.words();

  await editArticlePage.editArticleDescriptionField(newDescription);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleDescription(newDescription);
});

test('Remove an article description for the existing article', async () => {
  await editArticlePage.goToEditArticlePage();
  await editArticlePage.deleteArticleDescriptionValue();
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertErrorMessageContainsText(ARTICLE_DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Edit the article text for the existing article', async () => {
  await editArticlePage.goToEditArticlePage();

  const newText = faker.lorem.words();

  await editArticlePage.editArticleTextField(newText);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTextIsVisible(newText);
});

test('Remove an article text for the existing article', async () => {
  await editArticlePage.goToEditArticlePage();
  await editArticlePage.deleteArticleTextValue();
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertErrorMessageContainsText(ARTICLE_BODY_CANNOT_BE_EMPTY);
});

test('Add the tag for the existing article without tags', async () => {
  await editArticlePage.goToEditArticlePage();

  const newTag = faker.lorem.word();

  await editArticlePage.editTagField(newTag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForNavigationAndReload();

  await viewArticlePage.assertArticleTagIsVisible(newTag);
});


