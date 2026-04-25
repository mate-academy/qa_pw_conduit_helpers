// - *Edit the article title for the existing article*
// - *Edit the article description for the existing article*
// - *Edit the article text for the existing article*
// - *Add the tag for the existing article without tags*
// - *Add the tag for the existing article with tags*
// - *Remove an article tag for the existing article with tag*
// - *Remove an article title for the existing article*
// - *Remove an article description for the existing article*
// - *Remove the article text for the existing article*

import { test } from '@playwright/test';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser.js';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle.js';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData.js';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData.js';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage.js';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage.js';
import { faker } from '@faker-js/faker';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages.js';

test.describe('Edit article with tags', () => {
  let article;
  let editArticlePage;
  let viewArticlePage;

  test.beforeEach(async ({ page }) => {
    article = generateNewArticleData(1);
    editArticlePage = new EditArticlePage(page);
    viewArticlePage = new ViewArticlePage(page);
    const user = generateNewUserData();

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
  });

  test('Edit the article title for the existing article', async ({ page }) => {
    const articleTitle = faker.lorem.words();

    await editArticlePage.fillTitleField(articleTitle);
    await editArticlePage.clickUpdateArticleButton();
    // Conduit serves stale article data after redirect — force a refresh
    await page.waitForURL(/\/article\//);
    await page.reload();

    await viewArticlePage.assertArticleTitleIsVisible(articleTitle);
  });

  test('Edit the article description for the existing article', async () => {
    const articleDescription = faker.lorem.sentence(4);

    await editArticlePage.fillDescriptionField(articleDescription);
    await editArticlePage.clickUpdateArticleButton();
  });

  test('Edit the article text for the existing article', async () => {
    const articleText = faker.lorem.sentences(2);

    await editArticlePage.fillTextField(articleText);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTextIsVisible(articleText);
  });

  test('Add the tag for the existing article with tags', async ({ page }) => {
    const newArticleTags = [faker.lorem.word()];

    await editArticlePage.fillTagsField(newArticleTags);
    await editArticlePage.clickUpdateArticleButton();
    // Conduit serves stale article data after redirect — force a refresh
    await page.waitForURL(/\/article\//);
    await page.reload();

    const combinedTags = [...article.tags, ...newArticleTags];

    await viewArticlePage.assertArticleTagsAreVisible(combinedTags);
  });

  test('Remove an article tag for the existing article with tag', async () => {
    const firstTag = article.tags[0];

    await editArticlePage.clickRemoveTag(firstTag);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTagIsNotVisible(firstTag);
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

test.describe('Edit article without tags', () => {
  let article;
  let editArticlePage;
  let viewArticlePage;

  test.beforeEach(async ({ page }) => {
    article = generateNewArticleData();
    editArticlePage = new EditArticlePage(page);
    viewArticlePage = new ViewArticlePage(page);
    const user = generateNewUserData();

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
  });

  test('Add the tag for the existing article without tags', async ({
    page,
  }) => {
    const articleTags = [faker.lorem.word()];

    await editArticlePage.fillTagsField(articleTags);
    await editArticlePage.clickUpdateArticleButton();
    // Conduit serves stale article data after redirect — force a refresh
    await page.waitForURL(/\/article\//);
    await page.reload();

    await viewArticlePage.assertArticleTagsAreVisible(articleTags);
  });
});
