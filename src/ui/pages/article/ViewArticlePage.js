import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.newArticleTitleHeader = page.getByRole('heading');
    this.newArticleDescription = page.getByRole('link');
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

  async assertNewArticleTitleIsVisible(newTitle) {
    await test.step(`Assert the article has new title'`, async () => {
      await expect(this.newArticleTitleHeader).toContainText(newTitle);
    });
  }

  async assertNewDescriptionisVisible(newDescription) {
    await test.step(`Assert the article has new description'`, async () => {
      await expect(this.newArticleDescription).toContainText(newDescription);
    });
  }
}
