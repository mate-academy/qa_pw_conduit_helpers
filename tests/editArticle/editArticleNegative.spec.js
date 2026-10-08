import { test } from '@playwright/test';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TEXT_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);

  article = generateNewArticleData();

  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Remove an article title for the existing article', async ({ page }) => {
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillTitleField('');

  await createArticlePage.clickUpdateArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    TITLE_CANNOT_BE_EMPTY
  );
});

test('Remove an article description for the existing article', async ({
  page,
}) => {
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillDescriptionField('');

  await createArticlePage.clickUpdateArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY
  );
});

test('Remove the article text for the existing article', async ({ page }) => {
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillTextField('');

  await createArticlePage.clickUpdateArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    TEXT_CANNOT_BE_EMPTY
  );
});
