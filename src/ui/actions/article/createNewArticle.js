import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { HomePage } from '../../pages/HomePage';
import { test } from '@playwright/test';

export async function createNewArticleWithTags(page, article) {
  await test.step(`Create new article with tags`, async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.fillTagField(article.tags[0]);
    await createArticlePage.clickPublishArticleButton();
  });
}

export async function createNewArticleWithoutTags(page, article) {
  await test.step(`Create new article without tags`, async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.clickPublishArticleButton();
  });
}
