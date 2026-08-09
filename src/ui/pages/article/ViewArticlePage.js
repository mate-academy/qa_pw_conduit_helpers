import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleLink = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
    this.tagList = page.locator('.tag-list');
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async waitForArticlePage() {
    await test.step(`Wait for the article page to load`, async () => {
      // Known app issue: the article header does not always
      // re-render with fresh data right after an update, so we
      // reload to get the actual persisted state from the server.
      await this.page.waitForURL(/\/article\//);
      await this.page.reload();
      await expect(this.articleTitleHeader).toBeVisible();
    });
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

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the '${tag}' tag is visible`, async () => {
      await expect(this.tagList.getByText(tag)).toBeVisible();
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the '${tag}' tag is not visible`, async () => {
      await expect(this.tagList.getByText(tag)).toBeHidden();
    });
  }
}