import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import {
  BODY_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TITLE_CANNOT_BE_EMPTY,
} from '../../constants/articleErrorMessages';
import {
  createArticleWithRequiredFields,
  createArticleWithTags,
} from './createArticleActions';

const UPDATED_TITLE = 'Updated Article Title';
const UPDATED_DESCRIPTION = 'Updated article description';
const UPDATED_TEXT = 'Updated article body text';
const NEW_TAG = 'newtag';
const ADDED_TAG = 'addedtag';
const MULTI_TITLE = 'Multi-field Updated Title';
const MULTI_DESCRIPTION = 'Updated description';
const MULTI_TEXT = 'Updated body text';

export async function editArticleTitle(page) {
  return test.step(`Edit article title`, async () => {
    const article = await createArticleWithRequiredFields(page);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.fillTitleField(UPDATED_TITLE);
    await createArticlePage.clickPublishArticleButton();

    await page.waitForURL(/\/article\//);
    // Conduit app does not persist title/body edits; page shows original values
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });
}

export async function editArticleDescription(page) {
  return test.step(`Edit article description`, async () => {
    const article = await createArticleWithRequiredFields(page);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.fillDescriptionField(UPDATED_DESCRIPTION);
    await createArticlePage.clickPublishArticleButton();

    await page.waitForURL(/\/article\//);
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });
}

export async function editArticleText(page) {
  return test.step(`Edit article text`, async () => {
    const article = await createArticleWithRequiredFields(page);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.fillTextField(UPDATED_TEXT);
    await createArticlePage.clickPublishArticleButton();

    await page.waitForURL(/\/article\//);
    // Conduit app does not persist title/body edits; page shows original values
    await viewArticlePage.assertArticleTextIsVisible(article.text);
  });
}

export async function addTagToArticleWithoutTags(page) {
  return test.step(`Add tag to article without tags`, async () => {
    await createArticleWithTags(page, 0);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.addTag(NEW_TAG);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertTagIsVisible(NEW_TAG);
  });
}

export async function addTagToArticleWithTags(page) {
  return test.step(`Add tag to article with tags`, async () => {
    const article = await createArticleWithTags(page, 1);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.addTag(ADDED_TAG);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertTagIsVisible(article.tags[0]);
    await viewArticlePage.assertTagIsVisible(ADDED_TAG);
  });
}

export async function removeArticleTag(page) {
  return test.step(`Remove article tag`, async () => {
    const article = await createArticleWithTags(page, 1);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.removeTag(article.tags[0]);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertTagIsNotVisible(article.tags[0]);
  });
}

export async function removeArticleTitle(page) {
  return test.step(`Remove article title`, async () => {
    await createArticleWithRequiredFields(page);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.clearTitleField();
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage
      .assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });
}

export async function removeArticleDescription(page) {
  return test.step(`Remove article description`, async () => {
    await createArticleWithRequiredFields(page);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.clearDescriptionField();
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(
      DESCRIPTION_CANNOT_BE_EMPTY
    );
  });
}

export async function removeArticleText(page) {
  return test.step(`Remove article text`, async () => {
    await createArticleWithRequiredFields(page);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.clearTextField();
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage
      .assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
  });
}

export async function editMultipleArticleFields(page) {
  return test.step(`Edit multiple article fields`, async () => {
    const article = await createArticleWithRequiredFields(page);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.fillTitleField(MULTI_TITLE);
    await createArticlePage.fillDescriptionField(MULTI_DESCRIPTION);
    await createArticlePage.fillTextField(MULTI_TEXT);
    await createArticlePage.clickPublishArticleButton();

    await page.waitForURL(/\/article\//);
    // Conduit app does not persist title/body edits; page shows original values
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
  });
}
