import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

/**
 * Creates a new article using UI steps.
 * @param {import('@playwright/test').Page} page Playwright page instance
 * @param {{ title: string; description: string; text: string; tags?: string[] }} article Article data
 * @example
 * await createNewArticle(page, { title: 'My', description: 'Desc', text: 'Body', tags: ['tag1','tag2'] });
 */
export async function createNewArticle(page, article) {
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
        // Assuming there is a tag input field with placeholder 'Enter tags'
        // If actual locator differs, adjust accordingly.
        const tagInput = page.getByPlaceholder('Enter tags');
        // Using nested step to keep trace readable
        await test.step(`Add tag: ${tag}`, async () => {
          await tagInput.fill(tag);
          await tagInput.press('Enter');
        });
      }
    }

    await createArticlePage.clickPublishArticleButton();

    // Basic assertions to ensure article page loaded
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
  });
}
