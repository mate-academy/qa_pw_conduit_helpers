import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.locator('h1');
    //this.articleTitleHeader = page.getByRole('heading');
    this.articleContentContainer = page.locator('.article-content');
    this.editArticleButton = page.getByRole('link', { name: ' Edit Article' })
    .first();
    this.tagsList = page.locator('ul.tag-list');
  }

  async clickEditArticleButton() {
    await test.step(`Click the edit article button`, async () => {
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
      const textLocator = this.articleContentContainer.getByText(text);
      await expect(textLocator).toBeVisible();
    });
  }

  async assertTagsAreVisible(tags) {
  await test.step(`Assert tags are visible`, async () => {
    for (const tag of tags) {
      await expect(this.tagsList).toContainText(tag);
    }
  });
}
  async assertTagsAreNotVisible(tags) {
  await test.step(`Assert tags are not visible`, async () => {
    for (const tag of tags) {
      await expect(this.tagsList).not.toContainText(tag);
    }
  });
}
}
