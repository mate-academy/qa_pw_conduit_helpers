import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

/**
 * Creates a new article using UI steps and returns its metadata for further tests (e.g., editing).
 * @param {import('@playwright/test').Page} page Playwright page instance
 * @param {{ title: string; description: string; text: string; tags?: string[] }} article Article data
 * @returns {Promise<{ slug: string; url: string; title: string; description: string; text: string; tags?: string[] }>}
 * @example
 * const created = await createNewArticle(page, { title: 'My', description: 'Desc', text: 'Body', tags: ['tag1','tag2'] });
 * await editArticle(page, created.slug, { title: 'Updated' });
 */
export async function createNewArticle(page, article) {
  let slug;
  let fullUrl;
  await test.step('Create a new article', async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    if (article.tags && Array.isArray(article.tags) && article.tags.length > 0) {
      for (const tag of article.tags) {
        await createArticlePage.addTag(tag);
      }
    }

    await createArticlePage.clickPublishArticleButton();

    await page.waitForLoadState('networkidle');
    // Extract slug from URL
  fullUrl = page.url();
  const lastSegment = fullUrl.split('/').pop() || '';
  slug = lastSegment.replace(/[#?].*/, '');
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
    // Optional: verify tags present
    if (article.tags) {
      for (const tag of article.tags) {
        await expect(page.getByText(tag).first()).toBeVisible();
      }
    }
  });
  return { slug, url: fullUrl, title: article.title, description: article.description, text: article.text, tags: article.tags };
}
