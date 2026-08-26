import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { articleErrorMessages } from '../../src/ui/constants/articleErrorMessages';

let homePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Create an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    articleErrorMessages.TITLE_CANNOT_BE_EMPTY,
  );
});
