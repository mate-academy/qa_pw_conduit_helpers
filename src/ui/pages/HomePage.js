import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.locator('.nav-item', { hasText: 'Global Feed' });
    this.articleDescription = page.locator('.article-preview');
  }

  async open() {
    await test.step(`Open the Home page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleDescriptionIsVisible(description, index = 0) {
    await test.step(`Assert the article has correct description'`, async () => {
      await expect(this.articleDescription.nth(index)).toContainText(
        description,
      );
    });
  }
}
