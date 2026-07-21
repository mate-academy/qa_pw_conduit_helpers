import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.locator('.banner h1');
    this.editButton = page.getByRole('link', { name: ' Edit Article' }).first();
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

    async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description'`, async () => {
      await expect(this.articleTitleHeader).toContainText(description);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the article has correct tag'`, async () => {
      await expect(this.page.getByText(tag)).toBeVisible();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editButton.click();
    });
  }

  async reloadArticlePage() {
    await test.step(`Reload the article page`, async () => {
      await this.page.reload();
    });
  }
    async assertArticleTagIsNotVisible(tag) {
      await test.step(`Assert the article does not have the tag'`, async () => {
        await expect(this.page.getByText(tag)).toBeHidden();
      });   
    }
  }