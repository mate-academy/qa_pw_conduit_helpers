import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .nth(1);
    this.userProfile = page
      .getByRole('link', { name: 'author profile image' })
      .first();
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description'`, async () => {
      await expect(this.page.getByText(description)).toBeVisible();
    });
  }

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the article has correct tag'`, async () => {
      await expect(this.page.getByText(tag)).toBeVisible();
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the article doesn't have tag'`, async () => {
      await expect(this.page.getByText(tag)).toBeHidden();
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickUserProfile() {
    await test.step(`Click the user profile link`, async () => {
      await this.userProfile.click();
    });
  }
}
