import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
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

  articlePreview(title) {
    return this.page.locator('.article-preview', { hasText: title });
  }

  async openHomePage() {
    await test.step(`Open the Home page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertArticlePreviewDescriptionIsVisible(title, description) {
    await test.step(`Assert '${title}' description is correct`, async () => {
      await expect(
        this.articlePreview(title).getByText(description),
      ).toBeVisible();
    });
  }
}