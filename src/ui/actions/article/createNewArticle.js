import { HomePage } from '../../pages/HomePage.js';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage.js';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage.js';
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  await test.step(`Create new article`, async () => {
    const createArticle = new CreateArticlePage(page);
    const homePage = new HomePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await homePage.clickNewArticleLink();
    await createArticle.fillTitleField(article.title);
    await createArticle.fillDescriptionField(article.description);
    await createArticle.fillTextField(article.text);
    await createArticle.fillTagField(article.tags);
    await createArticle.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);

  });
} 