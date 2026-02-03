import { test } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  await signUpUser(page, user);
});

test('Create an article with required fields', async ({ page }) => {
  const article = generateNewArticleData();
  await createNewArticle(page, article);
});

test('Create an article with tags', async ({ page }) => {
  const article = generateNewArticleData(2);
  await createNewArticle(page, article);
});