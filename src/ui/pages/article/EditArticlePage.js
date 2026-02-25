import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { CreateNewArticle } from '../../src/ui/pages/article/CreateNewArticlePage';

import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { ERROR_MESSAGES } from '../../src/ui/constants/articleErrorMessages';


let editArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);

  const user = generateNewUserData();
  article = generateNewArticleData(1);

  await signUpUser(page, user);
  await CreateNewArticle(page, article);
});

test('Edit article title', async () => {
  const newTitle = 'Updated Title';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.fillTitle(newTitle);
  await editArticlePage.clickUpdate();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});

test('Edit article description', async () => {
  const newDescription = 'Updated Description';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.fillDescription(newDescription);
  await editArticlePage.clickUpdate();

  await viewArticlePage.assertArticleDescriptionIsVisible(newDescription);
});

test('Edit article body', async () => {
  const newBody = 'Updated Body';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.fillBody(newBody);
  await editArticlePage.clickUpdate();

  await viewArticlePage.assertArticleTextIsVisible(newBody);
});

test('Add tag to article without tags', async ({ page }) => {
  const articleWithoutTags = generateNewArticleData(0);
  await CreateNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticle();
  await editArticlePage.addTag('newTag');
  await editArticlePage.clickUpdate();

  await viewArticlePage.assertTagVisible('newTag');
});

test('Add tag to article with existing tags', async () => {
  await viewArticlePage.clickEditArticle();
  await editArticlePage.addTag('extraTag');
  await editArticlePage.clickUpdate();

  await viewArticlePage.assertTagVisible('extraTag');
});

test('Remove article tag', async () => {
  const tagToRemove = article.tags[0];

  await viewArticlePage.clickEditArticle();
  await editArticlePage.removeTag(tagToRemove);
  await editArticlePage.clickUpdate();

  await viewArticlePage.assertTagNotVisible(tagToRemove);
});

test('Remove article title', async () => {
  await viewArticlePage.clickEditArticle();
  await editArticlePage.clearTitle();
  await editArticlePage.clickUpdate();

  await editArticlePage.assertError(ERROR_MESSAGES.TITLE_REQUIRED);
});

test('Remove article description', async () => {
  await viewArticlePage.clickEditArticle();
  await editArticlePage.clearDescription();
  await editArticlePage.clickUpdate();

  await editArticlePage.assertError(ERROR_MESSAGES.DESCRIPTION_REQUIRED);
});

test('Remove article body', async () => {
  await viewArticlePage.clickEditArticle();
  await editArticlePage.clearBody();
  await editArticlePage.clickUpdate();

  await editArticlePage.assertError(ERROR_MESSAGES.BODY_REQUIRED);
});