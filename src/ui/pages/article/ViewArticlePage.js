import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
    this.homeButton = page.getByRole('link', { name: 'Home' });
  }

  async clickEditButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editButton.click();
    });
  }

  async clickHomeButton() {
    await test.step(`Click the 'Home' button`, async () => {
      await this.homeButton.click();
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

  async assertArticleTagIsVisible(tags) {
    for (const tag of tags) {
      await test.step(`Assert the article tag "${tag}" is visible`,
        async () => {
        await expect(this.page.getByText(tag)).toBeVisible();
      });
    }
  }

  async assertArticleTagIsDeleted(tags) {
    for (const tag of tags) {
      await test.step(`Assert the article tag "${tag}" is deleted`,
        async () => {
        await expect(this.page.getByText(tag)).toHaveCount(0);
      });
    }
  }
}
