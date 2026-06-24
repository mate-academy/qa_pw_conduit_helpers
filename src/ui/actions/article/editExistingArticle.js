import { test } from '@playwright/test';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';

export async function editExistingArticleTitle(page, newTitle) {
  await test.step(`Edit existing article title to: "${newTitle}"`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editorPage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleButton();

    await editorPage.fillTitleField(newTitle);

    await editorPage.clickUpdateArticleButton();
  });
}

export async function editExistingArticleDescription(page, newDescription) {
  await test.step(`Edit existing article description to: 
    "${newDescription}"`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editorPage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleButton();

    await editorPage.fillDescriptionField(newDescription);

    await editorPage.clickUpdateArticleButton();
  });
}

export async function editExistingArticleText(page, newText) {
  await test.step(`Edit existing article text to: "${newText}"`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editorPage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleButton();

    await editorPage.fillTextField(newText);

    await editorPage.clickUpdateArticleButton();
  });
}

export async function editExistingArticleTag(page, newTag) {
  await test.step(`Edit existing article tag to: "${newTag}"`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editorPage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleButton();

    await editorPage.fillTagsField(newTag);
    await editorPage.clickUpdateArticleButton();
  });
}

export async function removeExistingArticleTag(page, tag) {
  await test.step(`Remove existing article tag`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editorPage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleButton();

    await editorPage.assertArticleTagIsVisible(tag);//
    await editorPage.clickRemoveArticleTagButton(tag);
    await editorPage.clickUpdateArticleButton();
  });
}

export async function removeExistingArticleText(page) {
  await test.step(`Remove existing article text`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editorPage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleButton();

    await editorPage.clearArticleTextField();
    await editorPage.clickUpdateArticleButton();
  });
}

export async function removeExistingArticleDescription(page) {
  await test.step(`Remove existing article description`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editorPage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleButton();

    await editorPage.clearArticleDescriptionField();
    await editorPage.clickUpdateArticleButton();
  });
}

export async function removeExistingArticleTitle(page) {
  await test.step(`Remove existing article title`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editorPage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleButton();

    await editorPage.clearArticleTitleField();
    await editorPage.clickUpdateArticleButton();
  });
}
