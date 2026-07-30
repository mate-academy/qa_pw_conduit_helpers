import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  await test.step(`Create new article: ${article.title}`, async () => {
    const createArticlePage = new CreateArticlePage(page);

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.body || article.text);

    let tagToFill = null;
    if (typeof article.tag === 'string') {
      tagToFill = article.tag;
    } else if (
      Array.isArray(article.tags) &&
      typeof article.tags[0] === 'string'
    ) {
      tagToFill = article.tags[0];
    } else if (article.tag) {
      tagToFill = String(article.tag);
    }

    if (tagToFill) {
      await page.getByPlaceholder('Enter tags').fill(tagToFill);
      await page.getByPlaceholder('Enter tags').press('Enter');
    }

    await createArticlePage.clickPublishArticleButton();
    await page.waitForURL('**/article/**');
  });
}
