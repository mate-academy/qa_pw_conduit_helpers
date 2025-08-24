import { test, expect } from '@playwright/test';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArtickePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.describe('Edit an article with tags', () => {
  let viewArticlePage;
  let editArticlePage;
  let article;

  test.beforeEach(async ({ page }) => {
    viewArticlePage = new ViewArticlePage(page);
    editArticlePage = new EditArticlePage(page);
    article = generateNewArticleData(3);
    const user = generateNewUserData();

    await signUpUser(page, user);
    await createNewArticle(page, article);
    console.log(article.tags);
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.assertEditArticlePageIsOpened();
  });

  test('Edit the article title for the existing article', async ({ page }) => {
    const newArticle = generateNewArticleData();

    await editArticlePage.fillTitleField(newArticle.title);
    await editArticlePage.clickUpdateArticleButton();

    await page.waitForURL(`**/article/**`);
    await page.reload();

    await viewArticlePage.assertArticleTitleIsVisible(newArticle.title);
  });

  test('Edit the article description for the existing article', async ({
    page,
  }) => {
    const newArticle = generateNewArticleData();
    const responsePromise = page.waitForResponse(
      response =>
        response.url().includes('/api/articles/') &&
        response.request().method() === 'PUT' &&
        response.status() === 200,
    );

    await editArticlePage.fillDescriptionField(newArticle.description);
    await editArticlePage.clickUpdateArticleButton();

    const response = await responsePromise;
    const responseBody = await response.json();

    expect(responseBody.article.description).toBe(newArticle.description);
  });

  test('Edit the article text for the existing article', async ({ page }) => {
    const newArticle = generateNewArticleData();

    await editArticlePage.fillTextField(newArticle.text);
    await editArticlePage.clickUpdateArticleButton();

    await page.waitForURL(`**/article/**`);
    await page.reload();
    await viewArticlePage.assertArticleTextIsVisible(newArticle.text);
  });

  test('Add the tag for the existing article with tags', async ({ page }) => {
    const newArticle = generateNewArticleData(1);

    await editArticlePage.fillTagsField(newArticle.tags);
    await editArticlePage.clickUpdateArticleButton();

    await page.waitForURL(`**/article/**`);
    await page.reload();
    await viewArticlePage.assertArticleTagsAreVisible(newArticle.tags);
  });

  test('Remove the tag for the existing article with tags', async ({
    page,
  }) => {
    const randomIndex = Math.floor(Math.random() * article.tags.length);
    const tagToRemove = article.tags[randomIndex];

    console.log(randomIndex);
    console.log(tagToRemove);

    await editArticlePage.removeArticleTag(tagToRemove);
    await editArticlePage.clickUpdateArticleButton();

    await page.waitForURL(`**/article/**`);
    await page.reload();
    await viewArticlePage.assertDeletedArticleTags(tagToRemove);
  });

  test('Remove an article title for the existing article', async () => {
    await editArticlePage.fillTitleField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });

  test('Remove an article description for the existing article', async () => {
    await editArticlePage.fillDescriptionField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(
      DESCRIPTION_CANNOT_BE_EMPTY,
    );
  });
  test('Remove the article text for the existing article', async () => {
    await editArticlePage.fillTextField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
  });
});
