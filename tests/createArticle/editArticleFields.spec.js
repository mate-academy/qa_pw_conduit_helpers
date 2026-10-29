import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';

test.describe('Edit article fields', () => {
  test.beforeEach(async ({ page }) => {
    const article = generateNewArticleData();
    const user = generateNewUserData();

    await signUpUser(page, user);
    await createNewArticle(page, article);
  });

  test('Edit the article title for the existing article', async ({ page }) => {
    await editArticle(page, 'title');
  });

  test('Edit the article description for the existing article', async ({
    page,
  }) => {
    await editArticle(page, 'description');
  });

  test('Edit the article text for the existing article', async ({ page }) => {
    await editArticle(page, 'text');
  });
});
