import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.locator('h1');
    this.editArticleButton = page
      .getByRole('link')
      .filter({ hasText: 'Edit Article' })
      .first();
    this.deleteArticleButton = page
      .getByRole('link')
      .filter({ hasText: 'Delete Article' })
      .first();
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title, {
        timeout: 5000,
      });
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible({ timeout: 5000 });
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click on the 'Edit' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickDeleteArticleButton() {
    await test.step(`Click on the 'Delete' button`, async () => {
      await this.deleteArticleButton.click();
    });
  }
}
