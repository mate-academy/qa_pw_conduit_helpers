import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
    this.tags = page.locator('.tag-list li');
  }

  async reload() {
    await test.step(`Reload the article page`, async () => {
      await this.page.waitForURL(/\/article\//);
      await this.page.reload();
    });
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

  async assertArticleIsVisible(article) {
    await test.step(`Assert the article is visible`, async () => {
      await this.assertArticleTitleIsVisible(article.title);
      await this.assertArticleTextIsVisible(article.text);
    });
  }

  async assertTagsAreVisible(tags) {
    await test.step(`Assert the article has the correct tags`, async () => {
      await expect(this.tags).toHaveText(tags);
    });
  }

  async assertArticleHasNoTags() {
    await test.step(`Assert the article has no tags`, async () => {
      await expect(this.tags).toHaveCount(0);
    });
  }
}
