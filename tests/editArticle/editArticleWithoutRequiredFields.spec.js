import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticleWithTag } from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY,
         DESCRIPTION_CANNOT_BE_EMPTY,
         TEXT_CANNOT_BE_EMPTY
        } from '../../src/ui/constants/articleErrorMessages';

let homePage;
let createArticlePage;
let viewArticlePage;
let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticleWithTag(homePage.page, article);
});

test('Edit an article without a title', async () => {
    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.clearTitleField();
    await editArticlePage.clickUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Edit an article without a description', async () => {
    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.clearDescriptionField();
    await editArticlePage.clickUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Edit an article without a text', async () => {
    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.clearTextField();
    await editArticlePage.clickUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});