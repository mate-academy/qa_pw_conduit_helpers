import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  await test.step(`Create new Article page`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await createArticlePage.createNewArticle(article);

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });
}
