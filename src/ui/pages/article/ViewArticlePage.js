import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', { name: ' Edit Article' }).first();
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

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the ${tag} tag is visible'`, async () => {
      await expect(this.page.getByText(tag)).toBeVisible();
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the ${tag} tag is not visible`, async () => {
      await expect(this.page.getByText(tag)).not.toBeVisible();
    });
  }

  async refreshAfterUpdate() {
    await test.step(`Refresh after update the article`, async () => {
      await this.page.goBack();
      await this.page.reload();
    });
  }
}
