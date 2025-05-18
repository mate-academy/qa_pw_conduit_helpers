import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.getByRole('heading');
    this.articleText = page.locator('.article-content');
    this.articleTag = page.locator('.tag-list');
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitle).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.articleText).toContainText(text);
    });
  }

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the article has correct tag'`, async () => {
      await expect(this.articleTag).toContainText(tag);
    });
  }

  async assertArticleTagIsRemoved(tag) {
    await test.step(`Assert the article '${tag}' tag is removed'`, async () => {
      await expect(this.articleTag).not.toContainText(tag);
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.nth(1).click();
    });
  }

  async waitForNavigationAndReload() {
    await this.page.waitForNavigation();
    await this.page.reload();
  }
}
