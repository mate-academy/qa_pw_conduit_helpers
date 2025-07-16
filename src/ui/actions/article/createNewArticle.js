import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { test } from '@playwright/test';

export async function createArticleWithoutTags(page, article) {
  await test.step(`Create article without tags ${article}`, async () => {
    const homePage = new HomePage(page);
    const articlePage = new CreateArticlePage(page);

    await homePage.clickNewArticleLink();

    await articlePage.fillTitleField(article.title);
    await articlePage.fillTextField(article.text);
    await articlePage.fillDescriptionField(article.description);
    await articlePage.clickPublishArticleButton();
  });
}

export async function createArticleWithTag(page, article) {
  await test.step(`Create article with tags ${article}`, async () => {
    const homePage = new HomePage(page);
    const articlePage = new CreateArticlePage(page);

    await homePage.clickNewArticleLink();

    await articlePage.fillTitleField(article.title);
    await articlePage.fillTextField(article.text);
    await articlePage.fillArticleTag(article.tags[0]);
    await articlePage.fillDescriptionField(article.description);
    await articlePage.clickPublishArticleButton();
  });
}