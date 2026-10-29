import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let article;

test.beforeEach(async ({ page }) => {
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Creat an article with required fields', async ({ page }) => {
  await createNewArticle(page, article);
});
