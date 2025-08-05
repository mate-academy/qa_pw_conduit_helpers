import { test } from '@playwright/test';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { errors } from '../../src/ui/constants/articleErrorMessages';

let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({ page }, testInfo) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  const user = generateNewUserData();

  let articleData = {};
  if (testInfo.title.includes('with tags')) {
    articleData = generateNewArticleData(1);
  } else {
    articleData = generateNewArticleData();
  }

  await signUpUser(page, user);
  await createNewArticle(page, articleData);
});

test('edit the article title', async ({ page }) => {
  await viewArticlePage.editArticleButtonClick();
  await editArticlePage.editArticleTitle('edited');
  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL('**/article/**');
  await page.reload();
  await viewArticlePage.assertArticleTitleIsVisible('edited');
});

test('edit the article description', async ({ page }) => {
  await viewArticlePage.editArticleButtonClick();
  await editArticlePage.editArticleDescription('editedDescription');
  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL('**/article/**');
  await page.reload();
  await viewArticlePage.assertArticleDescriptionIsVisible('editedDescription');
});

test('edit the article text', async ({ page }) => {
  await viewArticlePage.editArticleButtonClick();
  await editArticlePage.editArticleText('edited');
  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL('**/article/**');
  await page.reload();
  await viewArticlePage.assertArticleTextIsVisible('edited');
});

test('add a tag for the article without tags', async () => {
  await viewArticlePage.editArticleButtonClick();
  await editArticlePage.addTag('edited');
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagIsVisible('edited');
});

test('add a tag for the article with tags', async () => {
  await viewArticlePage.editArticleButtonClick();
  await editArticlePage.addTag('edited2');
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagIsVisible('edited2');
});

test('remove a tag for the article with tags', async ({ page }) => {
  await viewArticlePage.editArticleButtonClick();
  await editArticlePage.removeTag();
  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL('**/article/**');
  await page.reload();
  await editArticlePage.assertTagIsDeleted();
});

test('remove article title', async () => {
  await viewArticlePage.editArticleButtonClick();
  await editArticlePage.editArticleTitle('');
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(
    errors.TITLE_CANNOT_BE_EMPTY,
  );
});

test('remove article description', async () => {
  await viewArticlePage.editArticleButtonClick();
  await editArticlePage.editArticleDescription('');
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(
    errors.DESCRIPTION_CANNOT_BE_EMPTY,
  );
});

test('remove article text', async () => {
  await viewArticlePage.editArticleButtonClick();
  await editArticlePage.editArticleText('');
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(
    errors.TEXT_CANNOT_BE_EMPTY,
  );
});
