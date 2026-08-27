import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import {
  BODY_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TITLE_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  await signUpUser(page, user);
});

async function createAndEdit(page, initialArticle, editedArticle, options = {}) {
  await createNewArticle(page, initialArticle);
  await editArticle(page, editedArticle, options);
}

test('Edit the article title', async ({ page }) => {
  const article = generateNewArticleData();
  await createAndEdit(page, article, {...article, title: `${article.title} updated`});
});

test('Edit the article description', async ({ page }) => {
  const article = generateNewArticleData();
  await createAndEdit(page, article, {...article, description: `${article.description} updated`});
});

test('Edit the article text', async ({ page }) => {
  const article = generateNewArticleData();
  await createAndEdit(page, article, {...article, text: `${article.text} updated`});
});

test('Add a tag to an article without tags', async ({ page }) => {
  const article = generateNewArticleData();
  const tag = generateNewArticleData(1).tags[0];
  await createAndEdit(page, article, article, {tagsToAdd: [tag]});
});

test('Add a tag to an article with tags', async ({ page }) => {
  const article = generateNewArticleData(1);
  const tag = generateNewArticleData(1).tags[0];
  await createAndEdit(page, article, article, {tagsToAdd: [tag]});
});

test('Remove a tag from an article', async ({ page }) => {
  const article = generateNewArticleData(1);
  await createAndEdit(page, article, article, {tagsToRemove: article.tags});
});

test('Remove the article title', async ({ page }) => {
  const article = generateNewArticleData();
  await createAndEdit(page, article, {...article, title: ''}, {
    expectedError: TITLE_CANNOT_BE_EMPTY,
  });
});

test('Remove the article description', async ({ page }) => {
  const article = generateNewArticleData();
  await createAndEdit(page, article, {...article, description: ''}, {
    expectedError: DESCRIPTION_CANNOT_BE_EMPTY,
  });
});

test('Remove the article text', async ({ page }) => {
  const article = generateNewArticleData();
  await createAndEdit(page, article, {...article, text: ''}, {
    expectedError: BODY_CANNOT_BE_EMPTY,
  });
});
