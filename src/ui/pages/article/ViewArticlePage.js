import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagsAreVisible(expectedTags) {
    await test.step(`
      Assert the article tags ${expectedTags} are visible`, async () => {
      const tagLocators = this.page.locator('.tag-list .tag-default');
      for (const tag of expectedTags) {
        await expect(tagLocators).toContainText([tag]);
      }
    });
  }
}
