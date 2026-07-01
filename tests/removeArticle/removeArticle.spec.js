import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let homePage;
let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Remove an article tag for the existing article with tag', async ({
  page,
}) => {
  const article = generateNewArticleData(1);
  
  await homePage.clickNewArticleLink();

  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.clickRemoveTagButton();

  await page.waitForTimeout(2000); // workaround for the issue with the button not being clickable

  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTagIsNotVisible(article.tags[0]);
});

test('Remove an article title for the existing article', async ({ page }) => {
  const article = generateNewArticleData(1);

  await homePage.clickNewArticleLink();

  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.clearTitleField();

  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageIsVisible(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', async ({
  page,
}) => {
  const article = generateNewArticleData(1);

  await homePage.clickNewArticleLink();

  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.clearDescriptionField();

  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageIsVisible(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});

test('Remove the article text for the existing article*', async ({ page }) => {
  const article = generateNewArticleData(1);

  await homePage.clickNewArticleLink();

  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.clearTextField();

  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageIsVisible(BODY_CANNOT_BE_EMPTY);
});
