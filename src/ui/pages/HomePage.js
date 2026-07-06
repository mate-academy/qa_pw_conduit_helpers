import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed', { exact: false });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed'`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleDescText(text) {
    await test.step(`Assert the description text is correct`, async () => {
      await expect(this.page.locator('a.preview-link p').first()).toContainText(
        text,
      );
    });
  }
}
