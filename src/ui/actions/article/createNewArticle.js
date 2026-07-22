import { test } from '@playwright/test';

import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';

export async function createNewArticle(page, article) {
  await test.step('Create new article', async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    if (article.tag) {
      await createArticlePage.fillTagField(article.tag);
    }

    await createArticlePage.clickPublishArticleButton();
  });
}
