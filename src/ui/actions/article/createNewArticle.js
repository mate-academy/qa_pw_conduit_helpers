import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  await test.step('Create new article', async () => {
    const createArticlePage = new CreateArticlePage(page);

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    if (article.tags?.length) {
      for (const tag of article.tags) {
        await createArticlePage.fillTagField(tag);
        await page.keyboard.press('Enter');
      }
    }
  });
}
