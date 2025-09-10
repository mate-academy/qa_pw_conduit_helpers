import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByText('Edit Article').nth(0);
    this.articleTags = page.locator('.tag-list');
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
      for (let tag of tags) {
        await expect(this.articleTags).toContainText(tag);
      }
    });
  }

  async verifyThatTagRemoved(tag) {
    await test.step(`Verify that tag is removed'`, async () => {
      await expect(this.articleTags).not.toContainText(tag);
    });
  }

  async clickEditArticleButton() {
    await test.step('Click edit article button', async () => {
      await this.editArticleButton.click();
    });
  }
}
