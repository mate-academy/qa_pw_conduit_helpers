import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
    .getByRole('link', { name: 'Edit Article' })
    .first();
    this.articleTagList = page.locator('.tag-list');
  }

  async assertArticleTagsNotToContainText(tag) {
    await test.step(`Assert the article has no tag - ${tag}`, async () => {
      await expect(this.articleTagList).not.toContainText(tag);
    });
  }

  async assertArticleTagsToContainText(tag) {
    await test.step(`Assert the article has tag - ${tag}`, async () => {
      await expect(this.articleTagList).toContainText(tag);
    });
  }

  async reload() {
    await test.step(`Reload the page`, async () => {
      await this.page.reload();
    });
  }

  async assertArticleTitleToContainText(title) {
    await test.step(`Assert the article has title - ${title}`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has text - ${text}`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }
}
