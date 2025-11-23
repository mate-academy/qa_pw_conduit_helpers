import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleEditArticleLink = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
    this.articleTag = page.locator('ul.tag-list li');
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

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.articleEditArticleLink.click();
    });
  }

  async isArticleTag(toBeCreated) {
    await test.step('Is article tag created', async () => {
      if (toBeCreated === 'Created') {
        await expect(this.articleTag).toBeVisible();
      } else {
        await expect(this.articleTag).toBeHidden();
      }
    });
  }

  getTagLocator(tagName) {
    return this.page.locator('ul.tag-list li', { hasText: tagName });
  }

  async assertArticleTagIsVisible(tagName) {
    await test.step('Article is visible', async () => {
      await expect(this.getTagLocator(tagName)).toBeVisible();
    });
  }

  async assertArticleTagIsHidden(tagName) {
    await test.step('Article is hidden', async () => {
      await expect(this.getTagLocator(tagName)).toBeHidden();
    });
  }
}
