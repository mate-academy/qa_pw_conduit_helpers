import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function createNewArticle(page, article) {
  await test.step(`Create an article`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await createArticlePage.open();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    if (article.tags) {
      for (const tag of article.tags) {
        await createArticlePage.fillTagsField(tag);
      }
    }
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleVisible(article.title);
    await viewArticlePage.assertArticleTextVisible(article.text);
  });
}
