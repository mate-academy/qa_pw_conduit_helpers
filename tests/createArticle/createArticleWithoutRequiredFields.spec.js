import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateEmptyArticleData } from '../../src/common/testData/generateEmptyArticleData';

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Creat an article without required fields', async ({ page }) => {
  const createArticlePage = new CreateArticlePage(page);
  const article = generateEmptyArticleData();

  await createNewArticle(page, article);
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
