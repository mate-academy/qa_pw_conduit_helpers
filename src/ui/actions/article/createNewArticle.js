import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  await test.step(`Create new Article`, async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await homePage.assertYourFeedTabIsVisible();
    await homePage.clickNewArticleLink();
    await createArticlePage.submitCreateNewArticle(article);
  });
}
