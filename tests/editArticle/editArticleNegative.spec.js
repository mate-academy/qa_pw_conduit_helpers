import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TEXT_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.describe('Edit article negative tests', () => {
  let createArticlePage;
  let viewArticlePage;
  let article;

  test.beforeEach(async ({ page }) => {
    createArticlePage = new CreateArticlePage(page);
    viewArticlePage = new ViewArticlePage(page);

    const user = generateNewUserData();
    await signUpUser(page, user);

    article = generateNewArticleData();
    await createNewArticle(page, article);
    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.assertTitleFieldHasValue(article.title);
  });

  test('Remove an article title for the existing article', async () => {
    await createArticlePage.clearTitleField();
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(
      TITLE_CANNOT_BE_EMPTY,
    );
  });

  test('Remove an article description for the existing article', async () => {
    await createArticlePage.clearDescriptionField();
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(
      DESCRIPTION_CANNOT_BE_EMPTY,
    );
  });

  test('Remove the article text for the existing article', async () => {
    await createArticlePage.clearTextField();
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(
      TEXT_CANNOT_BE_EMPTY,
    );
  });
});
