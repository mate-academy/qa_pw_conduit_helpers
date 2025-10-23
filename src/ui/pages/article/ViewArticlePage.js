import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleDescription = this.page.locator('.article-content p');
    this.editArticleButton = page.getByRole('link', { name: ' Edit Article' }).first();
  }

  async clickEditArticle() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
      await this.page.waitForURL(/\/editor\/.+/);
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertDescriptionToHaveText(description) {
    await test.step(`Assert the article description is shown`, async () => {
      await expect(this.articleDescription).toHaveText(description);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
