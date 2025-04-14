import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.globalFeedTab = page.getByText('Global Feed');
    this.articlePreview = page.locator('.article-preview');
  }

  async assertArticlePreviewToContainText(text, index = 0) {
    await test.step(`Assert the article preview contains the text: ${text}`,
        async () => {
      await expect(this.articlePreview.nth(index)).toContainText(text);
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async open() {
    await test.step(`Open the Home page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickSettingsLink() {
    await test.step(`Click the 'Settings' link`, async () => {
      await this.settingsLink.click();
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
}
