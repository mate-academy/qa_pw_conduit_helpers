import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading', { level: 1 });
    this.editArticleLink = page
      .getByRole('link', { name: /Edit Article/ })
      .first();
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click({ timeout: 15000 });
      await this.page.waitForURL(/\/editor\//);
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  /**
   * Asserts the description is visible. Use on pages that show article previews
   * (e.g. home feed). The article view page does not display the description.
   */
  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description`, async () => {
      await expect(this.page.getByText(description)).toBeVisible();
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertTagIsVisible(tag) {
    await test.step(`Assert the tag '${tag}' is visible`, async () => {
      await expect(this.page.getByText(tag, { exact: true })).toBeVisible();
    });
  }

  async assertTagIsNotVisible(tag) {
    await test.step(`Assert the tag '${tag}' is not visible`, async () => {
      await expect(this.page.getByText(tag, { exact: true })).toBeHidden();
    });
  }
}
