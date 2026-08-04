import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the article has correct tag`, async () => {
      await expect(this.page.locator('.tag-list')).toContainText(tag);
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the article was removed`, async () => {
      await expect(this.page.locator('.tag-list')).not.toContainText(tag);
    });
  }
}
