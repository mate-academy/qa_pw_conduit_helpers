import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  removeExistingArticleText,
} from '../../src/ui/actions/article/editExistingArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import {
  BODY_CANNOT_BE_EMPTY
} from '../../src/ui/constants/articleErrorMessages';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';

test.describe('Article Management', () => {
  let article = generateNewArticleData(0);

  test.beforeEach(async ({ page }) => {
    const user = generateNewUserData();
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);

    await createNewArticle(page, article);
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });

  test('Remove the text from the existing article', async ({ page }) => {
    const createArticlePage = new CreateArticlePage(page);

    await removeExistingArticleText(page);
    await createArticlePage.assertErrorMessageContainsText(
      BODY_CANNOT_BE_EMPTY,
    );
  });
});
