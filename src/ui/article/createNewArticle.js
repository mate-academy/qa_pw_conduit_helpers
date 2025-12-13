import { CreateArticlePage } from '../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../pages/article/ViewArticlePage';
import { test } from '@playwright/test';

export default async function createNewArticle(page, article) {
  await test.step(`Create new article`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await createArticlePage.open();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    if (article.tags && article.tags.length > 0) {
      for (const tag of article.tags) {
        await createArticlePage.addTag(tag);
      }
    }

    await createArticlePage.clickPublishArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });

  return article;
}
