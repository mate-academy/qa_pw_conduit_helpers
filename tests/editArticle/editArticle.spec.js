import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {
  addTagToArticleWithTags,
  addTagToArticleWithoutTags,
  editArticleDescription,
  editArticleText,
  editArticleTitle,
  editMultipleArticleFields,
  removeArticleDescription,
  removeArticleTag,
  removeArticleText,
  removeArticleTitle,
} from '../../src/ui/actions/article/editArticleActions';

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  await signUpUser(page, user);
});

test('Edit the article title for the existing article', async ({ page }) => {
  await editArticleTitle(page);
});

test('Edit the article description for the existing article',
  async ({ page }) => {
  await editArticleDescription(page);
});

test('Edit the article text for the existing article', async ({ page }) => {
  await editArticleText(page);
});

test('Add the tag for the existing article without tags', async ({ page }) => {
  await addTagToArticleWithoutTags(page);
});

test('Add the tag for the existing article with tags', async ({ page }) => {
  await addTagToArticleWithTags(page);
});

test('Remove an article tag for the existing article with tag',
  async ({ page }) => {
  await removeArticleTag(page);
});

test('Remove an article title for the existing article',
  async ({ page }) => {
  await removeArticleTitle(page);
});

test('Remove an article description for the existing article',
  async ({ page }) => {
  await removeArticleDescription(page);
});

test('Remove the article text for the existing article',
  async ({ page }) => {
  await removeArticleText(page);
});

test('Edit multiple fields at once for the existing article',
  async ({ page }) => {
  await editMultipleArticleFields(page);
});
