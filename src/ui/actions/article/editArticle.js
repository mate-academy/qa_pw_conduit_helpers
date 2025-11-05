import { test } from '@playwright/test';
import { ViewArticlePage } from "../../pages/article/ViewArticlePage";
import { EditArticlePage } from "../../pages/article/EditArticlePage";
import { DESCTIPTION_CANNOT_BE_EMPTY } from "../../constants/articleErrorMessages";
import { TITLE_CANNOT_BE_EMPTY } from "../../constants/articleErrorMessages";
import { TEXT_CANNOT_BE_EMPTY } from "../../constants/articleErrorMessages";

export async function editArticleTitle(page, editedArticle) {
  await test.step(`Edit the article's title`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    await editArticlePage.editTitleField(editedArticle.title);
    await editArticlePage.clickUpdateArticleButton();

    const slug = page.url().split('/').pop();
    await page.goto(`/article/${slug}`);

    await viewArticlePage.assertArticleTitleIsVisible(editedArticle.title);
  });
}

export async function editArticleDescription(page, article, editedArticle) {
  await test.step(`Edit the article's description`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    await editArticlePage.editDescriptionField(editedArticle.description);
    await editArticlePage.clickUpdateArticleButton();

    const slug = page.url().split('/').pop();
    await page.goto(`/article/${slug}`);

    await viewArticlePage.assertArticleDescriptionIsNotVisible(editedArticle.description);
  });
}

export async function editArticleText(page, editedArticle) {
  await test.step(`Edit the article's text`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    await editArticlePage.editTextField(editedArticle.text);
    await editArticlePage.clickUpdateArticleButton();

    const slug = page.url().split('/').pop();
    await page.goto(`/article/${slug}`);

    await viewArticlePage.assertArticleTextIsVisible(editedArticle.text);
  });
}

export async function editArticleTags(page, editedArticle) {
  await test.step(`Edit the article's tags`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    await editArticlePage.addTagsField(editedArticle.tags[0]);
    await editArticlePage.clickUpdateArticleButton();

    const slug = page.url().split('/').pop();
    await page.goto(`/article/${slug}`);

    await viewArticlePage.assertArticleTagIsVisible(editedArticle.tags[0]);
  });
}

export async function removeArticleTitle(page) {
  await test.step(`Remove the article's title`, async () => {
    const editArticlePage = new EditArticlePage(page);

    await editArticlePage.editTitleField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });
}

export async function removeArticleDescription(page) {
  await test.step(`Remove the article's description`, async () => {
    const editArticlePage = new EditArticlePage(page);

    await editArticlePage.editDescriptionField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(DESCTIPTION_CANNOT_BE_EMPTY);
  });
}

export async function removeArticleText(page) {
  await test.step(`Remove the article's text`, async () => {
    const editArticlePage = new EditArticlePage(page);

    await editArticlePage.editTextField('');
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
  });
}

export async function removeArticleTags(page, article) {
  await test.step(`Remove the article's tag`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    const tagToRemove = article.tags[0];

    await editArticlePage.removeTagsField(tagToRemove);
    await editArticlePage.clickUpdateArticleButton();

    const slug = page.url().split('/').pop();
    await page.goto(`/article/${slug}`);

    await viewArticlePage.assertTagIsNotVisible(tagToRemove);
  });
}

