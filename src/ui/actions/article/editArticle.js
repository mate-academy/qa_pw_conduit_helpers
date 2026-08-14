import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { HeaderPage } from '../../pages/article/HeaderPage';
import { ViewProfilePage } from '../../pages/article/ViewProfilePage';

export async function addTagToExistingArticleWithoutTags(page,article) {
  await test.step(`Add the tag for the existing article without tags`, 
    async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTagsField([article.newTag]);
    await editArticlePage.clickUpdateButton();
    await page.waitForTimeout(5000);
    await page.reload();
    await page.waitForTimeout(5000);
    await viewArticlePage.assertArticleTagIsVisible([article.newTag]);

  });
}

export async function addTagToExistingArticleWithTags(page,article) {
  await test.step(`Add the tag for the existing article with tags`, 
    async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTagsField([article.newTag]);
    await editArticlePage.clickUpdateButton();
    const expectedTags = ([...article.tags, article.newTag]);
    await page.waitForTimeout(5000);
    await page.reload();
    await page.waitForTimeout(5000);
    await viewArticlePage.assertArticleTagIsVisible(expectedTags);

  });
}

export async function editArticleTitleForExistingArticle(page,article) {
  await test.step(`Edit the article title for the existing article`, 
    async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField(article.newTitle);
    await editArticlePage.clickUpdateButton();
    await page.waitForTimeout(5000);
    await page.reload();
    await viewArticlePage.assertArticleTitleIsVisible(article.newTitle);

  });
}

export async function editArticleDescriptionForExistingArticle(page,article) {
  await test.step(`Edit the article description for the existing article`, 
    async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);
    const headerPage = new HeaderPage(page);
    const viewProfilePage = new ViewProfilePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillDescriptionField(article.newDescription);
    await editArticlePage.clickUpdateButton();
    await headerPage.clickProfileLink(); 
    await page.reload();
    await page.waitForTimeout(5000);
    await viewProfilePage.assertArticleDescription(article.newDescription);

  });
}

export async function editArticleTextForExistingArticle(page,article) {
  await test.step(`Edit the article text for the existing article`, 
    async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTextField(article.newText);
    await editArticlePage.clickUpdateButton();
    await page.waitForTimeout(5000);
    await page.reload();
    await page.waitForTimeout(5000);
    await viewArticlePage.assertArticleTextIsVisible(article.newText);

  });
}

export async function removeArticleTagForExistingArticle(page,article) {
  await test.step
  (`Remove an article 'tag' for the existing article with tag`, 
    async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.clickRemoveTagButton(1);
    await editArticlePage.clickUpdateButton();
    await page.reload();
    await page.waitForTimeout(5000);
    await viewArticlePage.assertTagIsRemoved(article.tags[1]);

  });
}

export async function removeArticleTitleForExistingArticle(page, messageText) {
  await test.step
  (`Remove an article 'Title' for the existing article with tag`, 
    async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.removeArticleTitle();
    await editArticlePage.clickUpdateButton();
    await editArticlePage.assertErrorMessageContainsText(messageText);

  });
}

export async function removeArticleDescForExistingArticle(page, messageText) {
  await test.step
  (`Remove an article 'description' for the existing article with tag`, 
    async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.removeArticleDescription();
    await editArticlePage.clickUpdateButton();
    await editArticlePage.assertErrorMessageContainsText(messageText);
  });
}

export async function removeArticleBodyForExistingArticle(page, messageText) {
  await test.step
  (`Remove an article 'Body' for the existing article with tag`, 
    async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.removeArticleBody();
    await editArticlePage.clickUpdateButton();
    await editArticlePage.assertErrorMessageContainsText(messageText);
  });
}