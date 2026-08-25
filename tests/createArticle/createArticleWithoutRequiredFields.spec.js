import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let createArticlePage;

test.beforeEach(async ({ page }) => {
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Create an article without required fields', async ({ page }) => {
  await createNewArticle(page, {});

  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
