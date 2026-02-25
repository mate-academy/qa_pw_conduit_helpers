import { test } from '@playwright/test';
import { CreateNewArticle } from '../../src/ui/pages/article/CreateNewArticlePage';
import { HomePage } from '../../pages/HomePage';

export async function createNewArticle (page, article) {
  await test.step('Create article', async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateNewArticle(page);

    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    if (article.tags?.length) {
      await createArticlePage.fillTags(article.tags);
    }

    await createArticlePage.clickPublishArticleButton();
  });
}