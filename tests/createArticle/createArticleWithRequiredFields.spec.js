import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Create an article with required fields', async ({ page }) => {
  await createNewArticle(page);
});
