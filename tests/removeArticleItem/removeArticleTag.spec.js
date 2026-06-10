import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  removeExistingArticleTag,
} from '../../src/ui/actions/article/editExistingArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.describe('Article Management', () => {
  let article = generateNewArticleData(1);

  test.beforeEach(async ({ page }) => {
    const user = generateNewUserData();
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);

    await createNewArticle(page, article);
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });

  test('Remove the tag from the existing article', async ({
    page,
  }) => {
    const viewArticlePage = new ViewArticlePage(page);

    await removeExistingArticleTag(page, article.tags[0]);
    await viewArticlePage.assertArticleTagIsNotVisible(article.tags[0]);
  });
});
