import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.articlePreviews = page.locator('.article-preview');
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description`, async () => {
      await expect(
        this.articlePreviews.locator('p').filter({ hasText: description }),
      ).toContainText(description);
    });
  }
}
