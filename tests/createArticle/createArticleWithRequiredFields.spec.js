import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  await signUpUser(page, user);

});

test.describe('Create an article with required fields', () => {

test('Create an article without tags', async ({ page }) => {
  const article = generateNewArticleData();
  await createNewArticle(page, article);
});

test('Create an article with tags', async ({ page }) => {
  const article = generateNewArticleData(3);
  await createNewArticle(page, article);
});

});