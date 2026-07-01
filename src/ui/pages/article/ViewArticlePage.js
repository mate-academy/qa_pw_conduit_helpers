import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .nth(1);
    this.articleTag = page.locator('.tag-list .tag-default');
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
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
      await expect(this.articleTag.filter({ hasText: tag })).toContainText(tag);
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the article does not have the tag`, async () => {
      await expect(this.articleTag.filter({ hasText: tag })).toHaveCount(0);
    });
  }

  async assertErrorMessageIsVisible(message) {
    await test.step(`Assert the error message is visible`, async () => {
      await expect(this.page.getByText(message)).toBeVisible();
    });
  }
}
