import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { removeArticleField } from '../../src/ui/actions/article/removeArticleField';

test.describe('Edit article fields', () => {
  test.beforeEach(async ({ page }) => {
    const article = generateNewArticleData();
    const user = generateNewUserData();

    await signUpUser(page, user);
    await createNewArticle(page, article);
  });

  test('Remove an article title for the existing article', async ({ page }) => {
    await removeArticleField(page, 'title');
  });

  test('Remove an article description for the existing article', async ({
    page,
  }) => {
    await removeArticleField(page, 'description');
  });

  test('Remove the article text for the existing article', async ({ page }) => {
    await removeArticleField(page, 'text');
  });
});
