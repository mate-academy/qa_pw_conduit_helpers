import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { HomePage } from '../../pages/HomePage';

import { test } from '@playwright/test';

export async function createNewArticle(page, data) {
  await test.step(`Create New Article`, async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(data.title);
    await createArticlePage.fillDescriptionField(data.description);
    await createArticlePage.fillTextField(data.text);
    await createArticlePage.fillArticleTagField(data.tags);
    await createArticlePage.clickPublishArticleButton();
    await viewArticlePage.assertArticleTextIsVisible(data.text);
    await viewArticlePage.assertArticleTitleIsVisible(data.title);
  });
}
