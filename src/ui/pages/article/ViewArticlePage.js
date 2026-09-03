import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.tagList = page.locator('.tag-list li');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
  }

  async clickEditArticleButton() {
    await test.step(`Click "Edit Article" button`, async () => {
      await this.editArticleButton.click();
      await this.page.waitForURL('**/editor/*');
    });
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

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the article has correct tag`, async () => {
      await expect(this.tagList.filter({ hasText: tag })).toBeVisible();
    });
  }

  async assertArticleTagIsRemoved(tag) {
    await test.step(`Assert the article doesn't have removed tag`, async () => {
      await expect(this.tagList.filter({ hasText: tag })).toBeHidden();
    });
  }
}
