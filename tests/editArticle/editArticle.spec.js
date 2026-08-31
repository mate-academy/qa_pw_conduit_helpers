import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createAndEditArticle } from '../../src/ui/actions/article/createAndEditArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import {
  BODY_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TITLE_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Edit the article title for the existing article', async ({ page }) => {
  const baseArticle = generateNewArticleData();
  const newArticle = generateNewArticleData();
  await createAndEditArticle(page, baseArticle, {
    title: `${newArticle.title} updated`,
  });
});

test('Edit the article description for the existing article', async ({
  page,
}) => {
  const baseArticle = generateNewArticleData();
  const newArticle = generateNewArticleData();
  await createAndEditArticle(page, baseArticle, {
    description: `${newArticle.description} updated`,
  });
});

test('Edit the article text for the existing article', async ({ page }) => {
  const baseArticle = generateNewArticleData();
  const newArticle = generateNewArticleData();
  await createAndEditArticle(page, baseArticle, {
    text: `${newArticle.text} updated`,
  });
});

test('Add the tag for the existing article without tags', async ({ page }) => {
  const baseArticle = generateNewArticleData();
  const newArticle = generateNewArticleData(1);
  const tag = newArticle.tags[0];
  await createAndEditArticle(page, baseArticle, { tagsToAdd: [tag] });
});

test('Add the tag for the existing article with tags', async ({ page }) => {
  const baseArticle = generateNewArticleData(1);
  const newArticle = generateNewArticleData(1);
  const tag = newArticle.tags[0];
  await createAndEditArticle(page, baseArticle, { tagsToAdd: [tag] }, 1);
});

test('Remove an article tag for the existing article with tag', async ({
  page,
}) => {
  const baseArticleWithTag = generateNewArticleData(1);
  const createdTag = baseArticleWithTag.tags[0];
  await createAndEditArticle(page, baseArticleWithTag, {
    tagsToRemove: [createdTag],
  });
});

test('Remove an article title for the existing article', async ({ page }) => {
  const baseArticle = generateNewArticleData();
  await createAndEditArticle(page, baseArticle, {
    title: '',
    error: TITLE_CANNOT_BE_EMPTY,
  });
});

test('Remove an article description for the existing article', async ({
  page,
}) => {
  const baseArticle = generateNewArticleData();
  await createAndEditArticle(page, baseArticle, {
    description: '',
    error: DESCRIPTION_CANNOT_BE_EMPTY,
  });
});

test('Remove the article text for the existing article', async ({ page }) => {
  const baseArticle = generateNewArticleData();
  await createAndEditArticle(page, baseArticle, {
    text: '',
    error: BODY_CANNOT_BE_EMPTY,
  });
});
