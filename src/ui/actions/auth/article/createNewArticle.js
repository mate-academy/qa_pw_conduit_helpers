import { CreateArticlePage } from "../../../pages/article/CreateArticlePage";
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  await test.step('create new article', async () => {
    const createArticlePage = new CreateArticlePage(page);

    await createArticlePage.createNewArticle(article);
  })
}

