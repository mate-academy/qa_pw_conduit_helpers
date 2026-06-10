import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
    this.profileImage = page.getByRole('link', { name: 'your profile image' });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.page.getByText(title)).toBeVisible();
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(tag)).toBeVisible();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the edit article button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickProfileImage() {
    await test.step(`Click the profile image`, async () => {
      await this.profileImage.click();
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(tag)).toBeHidden();
    });
  }
}
