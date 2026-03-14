import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';
import { faker } from '@faker-js/faker';
import {
  BODY_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TITLE_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

let viewArticlePage;
let editArticlePage;
let profilePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  profilePage = new ProfilePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Edit the article title for the article', async ({ page }) => {
  const article = generateNewArticleData();
  const title = faker.lorem.words()

  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTitleField(title);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();

  await viewArticlePage.assertArticleTitleVisible(title);
});

test('Edit the article description for the article', async ({ page }) => {
  const article = generateNewArticleData();
  const description = faker.lorem.sentence(4);

  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillDescriptionField(description);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();
  await profilePage.clickProfileLink();

  await viewArticlePage.assertArticleTextVisible(description);
});

test('Edit the article text for the article', async ({ page }) => {
  const article = generateNewArticleData();
  const text = faker.lorem.sentences(2);

  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTextField(text);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();

  await viewArticlePage.assertArticleTextVisible(text);
});

test('Add the tag for the article without tags', async ({ page }) => {
  const article = generateNewArticleData();
  const tag = faker.lorem.word();

  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField(tag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();

  await viewArticlePage.assertArticleTagVisible(tag);
});

test('Add the tag for the article with tags', async ({ page }) => {
  const article = generateNewArticleData(2);
  const tag = faker.lorem.word();

  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField(tag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();

  await viewArticlePage.assertArticleTagVisible(tag);
});

test('Remove an article tag for the article with tag', async ({ page }) => {
  const article = generateNewArticleData(1);
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeArticleTag();
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.refreshPage();

  await viewArticlePage.assertArticleTagNotVisible();
});

test('Remove an article title for the article', async ({ page }) => {
  const article = generateNewArticleData();
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTitleField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the article', async ({ page }) => {
  const article = generateNewArticleData();
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillDescriptionField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Remove the article text for the existing article', async ({ page }) => {
  const article = generateNewArticleData();
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTextField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
