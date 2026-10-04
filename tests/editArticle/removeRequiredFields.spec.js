import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Remove an article title for the existing article', async ({ page }) => {
  await editArticle(page, { ...article, title: '' });

  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', async ({
  page,
}) => {
  await editArticle(page, { ...article, description: '' });

  await editArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});

test('Remove the article text for the existing article', async ({ page }) => {
  await editArticle(page, { ...article, text: '' });

  await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
