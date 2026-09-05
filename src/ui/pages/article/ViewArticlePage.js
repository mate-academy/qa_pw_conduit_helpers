/* eslint-disable max-len */
import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButtonBanner = page.getByRole('link', { name: ' Edit Article' }).first();
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
    this.articleTags = page.locator('.tag-list').getByRole('listitem');
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButtonBanner.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
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
    await test.step(`Assert the article has correct tags'`, async () => {
      for (const tag of tags) {
        await expect(this.articleTags).toContainText(tag);
      }
    }); 
  }

}
