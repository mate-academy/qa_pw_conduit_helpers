import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.describe('Edit Article negative cases', () => {
  let article;
  let editArticlePage;

  test.beforeEach(async ({ page }) => {
    editArticlePage = new EditArticlePage(page);

    const user = generateNewUserData();
    article = generateNewArticleData();

    await signUpUser(page, user);
    await createNewArticle(page, article);
    await page.getByRole('link', { name: 'Edit Article' }).first().click();
  });

  test('Remove article title', async () => {
    await editArticlePage.editTitleField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(
      TITLE_CANNOT_BE_EMPTY,
    );
  });

  test('Remove article description', async () => {
    await editArticlePage.editDescriptionField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(
      DESCRIPTION_CANNOT_BE_EMPTY,
    );
  });

  test('Remove article text', async () => {
    await editArticlePage.editTextField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(
      BODY_CANNOT_BE_EMPTY,
    );
  });
});