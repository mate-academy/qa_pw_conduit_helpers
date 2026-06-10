import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  editExistingArticleTag
} from '../../src/ui/actions/article/editExistingArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.describe('Article Management', () => {
  let originalArticle;

  test.beforeEach(async ({ page }) => {
    const user = generateNewUserData();
    originalArticle = generateNewArticleData(1);
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);

    await createNewArticle(page, originalArticle);
    await viewArticlePage.assertArticleTitleIsVisible(originalArticle.title);
  });

  test('Add the tag for the existing article with tag', async ({
    page,
  }) => {
    const viewArticlePage = new ViewArticlePage(page);
    const newTag = generateNewArticleData(1).tags[0];

    await editExistingArticleTag(page, newTag);
    await viewArticlePage.assertArticleTagIsVisible(newTag);
  });
});
