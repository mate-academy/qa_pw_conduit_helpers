import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTags = page.locator('ul.tag-list');
    this.editArticleButton = page.getByRole('link',
      { name: 'Edit Article' }).first();
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async refreshPage() {
    await test.step(`Refresh the page`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
    });
  }

  async waitForArticlePage() {
    await test.step('Wait for Article page URL', async () => {
      await this.page.waitForURL('/article/*', { waitUntil: 'commit' });
    });
  }

  async assertArticleTitleVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagVisible(text) {
    await test.step(`Assert the article has correct tag'`, async () => {
      await expect(this.articleTags).toContainText(text);
    });
  }

  async assertArticleTagNotVisible() {
    await test.step(`Assert the article doesn't have tag'`, async () => {
      await expect(this.articleTags).toBeHidden();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}