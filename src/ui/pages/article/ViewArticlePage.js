import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleDescription = page.locator('p').first();
    this.editArticleLink = page.getByRole('link', { name: ' Edit Article' }).first();
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
    this.deleteArticleButton = page.getByRole('button', { name: ' Delete Article' }).first();
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toBeVisible();
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description`, async () => {
      await expect(this.articleDescription).toContainText(description);
    });
  }

  async assertArticleTitleIsNotVisible(title) {
    await test.step(`Assert the article title is not visible`, async () => {
      const titleLocator = this.page.getByRole('heading', { name: title });
      await expect(titleLocator).toHaveCount(0);
    });
  }

  async assertArticleDescriptionIsNotVisible(description) {
    await test.step(`Assert the article description is not visible`, async () => {
      const descriptionLocator = this.page.getByText(description, { exact: true });
      await expect(descriptionLocator).toHaveCount(0);
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the article tag is not visible`, async () => {
      const tagLocator = this.page.getByText(tag, { exact: true });
      await expect(tagLocator).toHaveCount(0);
    });
  }

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the article tag is visible`, async () => {
      const tagLocator = this.page.getByText(tag, { exact: true });
      await expect(tagLocator).toBeVisible();
    });
  }

  async assertArticleTextIsNotVisible(text) {
    await test.step(`Assert the article text is not visible`, async () => {
      const textLocator = this.page.getByText(text, { exact: true });
      await expect(textLocator).toHaveCount(0);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text, { exact: true })).toBeVisible();
    });
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async clickDeleteArticleButton() {
    await test.step(`Click the 'Delete Article' button`, async () => {
      await this.deleteArticleButton.click();
    });
  }
}
