import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateNewArticle } from '../../src/ui/pages/article/CreateNewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ERROR_MESSAGES } from '../../src/ui/constants/articleErrorMessages';

let homePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateNewArticle(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
  
});

test('Creat an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    ERROR_MESSAGES.TITLE_REQUIRED
  );
});
