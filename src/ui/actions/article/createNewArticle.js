import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';

export async function createNewArticle(page, article) {
  await test.step(`Create New Article`, async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await homePage.clickNewArticleLink();

    if ('title' in article) {
      await createArticlePage.fillTitleField(article.title);
    }
    if ('description' in article) {
      await createArticlePage.fillDescriptionField(article.description);
    }
    if ('text' in article) {
      await createArticlePage.fillTextField(article.text);
    }
    if (article.tags && article.tags.length > 0) {
      for (const tag of article.tags) {
        await createArticlePage.fillTagField(tag);
      }
    }

    await createArticlePage.clickPublishArticleButton();
  });
}

