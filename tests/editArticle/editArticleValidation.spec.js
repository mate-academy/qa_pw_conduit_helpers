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

let editArticlePage;
let viewArticlePage;

test.beforeEach(async ({ page }) => {
  editArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  const article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleLink();
});

test('Remove an article title for the existing article', async () => {
  await editArticlePage.fillTitleField('');
  await editArticlePage.clickPublishArticleButton();

  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', async () => {
  await editArticlePage.fillDescriptionField('');
  await editArticlePage.clickPublishArticleButton();

  await editArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});

test('Remove the article text for the existing article', async () => {
  await editArticlePage.fillTextField('');
  await editArticlePage.clickPublishArticleButton();

  await editArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
