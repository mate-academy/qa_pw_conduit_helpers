import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';

/**
 * Creates a new article and returns the article slug (last part of URL).
 * @param {import('@playwright/test').Page} page 
 * @param {Object} article 
 * @returns {Promise<string>} articleSlug
 */
export async function createNewArticle(page, article) {
  return await test.step(`Create new article`, async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillBodyField(article.body);

    if (article.tags?.length) {
      for (const tag of article.tags) {
        await createArticlePage.fillTag(tag);
        await page.keyboard.press('Enter'); 
      }
    }

    await createArticlePage.clickPublishArticleButton();

    await page.waitForURL('**/article/**'); 
      const url = page.url();
      const slug = url.split('/').pop();

      console.log('✅ Extracted slug:', slug);
      return slug;
  });
}
