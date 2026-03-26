import { CreateArticlePage } from '../../../pages/article/CreateArticlePage';
import { HomePage } from '../../../pages/HomePage';
import { test } from '@playwright/test';

export async function createNewArticleWithTags(page, article) {
  await test.step(`Creat an article with tags`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const homePage = new HomePage(page);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.fillTagsField(article.tags);
    await createArticlePage.clickPublishArticleButton();
  });
}
export async function createNewArticleWithoutTags(page, article) {
  await test.step(`Creat an article without tags`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const homePage = new HomePage(page);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.clickPublishArticleButton();
  });
}