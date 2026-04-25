import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.tags = page.locator('.tag-list').getByRole('listitem');
    this.editArticleButton = page
      .getByRole('link')
      .filter({ hasText: ' Edit Article' })
      .first();
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
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

  async assertArticleTagsAreVisible(tags) {
    await test.step(`Assert the article has correct tags`, async () => {
      for (const tag of tags) {
        await expect(this.tags.filter({ hasText: tag })).toBeVisible();
      }
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the article has correct tags`, async () => {
      await expect(this.tags.filter({ hasText: tag })).toBeHidden();
    });
  }
}
