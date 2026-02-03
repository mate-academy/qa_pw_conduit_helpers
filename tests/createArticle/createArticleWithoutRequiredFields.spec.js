import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  await signUpUser(page, user);
});

test('Create an article without required fields', async ({ page }) => {
  const homePage = new HomePage(page);
  const createArticlePage = new CreateArticlePage(page);

  await homePage.clickNewArticleLink();
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
