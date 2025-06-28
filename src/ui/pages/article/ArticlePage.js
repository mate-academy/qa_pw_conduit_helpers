import { test, expect } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .nth(0);
  }

  async clickEditArticle() {
    await test.step(`Click the 'Edit Article'`, async () => {
      await this.editArticleButton.click();
    });
  }

  async refreshPageForUpdateArticlePage() {
    await test.step(`Assert the article page is open'`, async () => {
      await expect(this.page).toHaveURL(/\/article\//);
      await this.page.reload();
      await this.page.waitForLoadState();
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
    await test.step(`Assert the article has correct tag ${tag}`, async () => {
      await expect(this.page.getByText(tag)).toBeVisible();
    });
  }

  async assertArticleTagIsHidden(tag) {
    await test.step(`Assert the article tag is hidden ${tag}`, async () => {
      await expect(this.page.getByText(tag)).toBeHidden();
    });
  }
}
