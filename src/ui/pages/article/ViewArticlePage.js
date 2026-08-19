import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading', {
      level: 1,
    });
    this.articleText = page.locator('.article-content p');
    this.articleTagsList = page.locator('.tag-list');
    this.editArticleLink = page
      .getByRole('link', {
        name: ' Edit Article',
      })
      .first();
    this.profileLink = page.getByRole('link', {
      name: 'your profile image',
    });
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step('Assert the article has correct title', async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step('Assert the article has correct text', async () => {
      await expect(this.articleText).toContainText(text);
    });
  }

  async assertArticleTagsAreVisible(tags) {
    await test.step('Assert the article has correct tags', async () => {
      for (const tag of tags) {
        await expect(this.articleTagsList).toContainText(tag);
      }
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the '${tag}' tag is not shown`, async () => {
      await expect(
        this.page.locator('.tag-list .tag-pill', { hasText: tag }),
      ).not.toBeVisible();
    });
  }

  async waitForArticlePage() {
    await test.step(`Wait for article page`, async () => {
      await this.page.waitForURL(/\/article\//);
    });
  }

  async clickProfileLink() {
    await test.step(`Click the 'Profile' link`, async () => {
      await this.profileLink.click();
    });
  }
}
