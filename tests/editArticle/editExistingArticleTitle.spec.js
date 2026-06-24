import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/article/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editExistingArticleTitle } from '../../src/ui/actions/article/editExistingArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.describe('Article Management', () => {
  let originalArticle;

  test.beforeEach(async ({ page }) => {
    const user = generateNewUserData();
    originalArticle = generateNewArticleData();
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);

    await createNewArticle(page, originalArticle);
    await viewArticlePage.assertArticleTitleIsVisible(originalArticle.title);
  });

  test('Edit the title for the existing article', async ({ page }) => {
    const viewArticlePage = new ViewArticlePage(page);

    const newTitle = generateNewArticleData().title;
    await editExistingArticleTitle(page, newTitle);
    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });
});