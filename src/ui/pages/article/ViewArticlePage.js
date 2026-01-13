import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .nth(1);
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.articleTagText = page.getByText('New Tag');
  }

  async clickEditArticleButton() {
    await test.step('Click Edit Article button', async () => {
      await this.editArticleButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step('Click Update Article button', async () => {
      //await Promise.all([
      //  this.page.waitForResponse(
      //    resp => resp.url().includes('/articles') && resp.status() === 200,
      //  ),
      this.updateArticleButton.click();
      //]
      //);
      //await this.page.reload();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toHaveText(title, {
        timeout: 10000,
      });
    });
  }

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the article has correct tag'`, async () => {
      await expect(this.articleTagText).toHaveText(tag, {
        timeout: 10000,
      });
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
