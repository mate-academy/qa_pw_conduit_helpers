import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function createNewArticle(page, article) {
  await test.step('Create a new article', async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await homePage.clickNewArticleLink();

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (article.tags.length > 0) {
      await createArticlePage.createArticleTagFields(article);
    } else {
      await createArticlePage.createArticleWithRequiredFields(article);
    }

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (article.tags.length > 0) {
      await viewArticlePage.assertTagsVisible(article.tags);
    }
  });
}
