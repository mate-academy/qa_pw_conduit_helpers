import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', {
        name: ' Edit Article',
      })
      .nth(1);
    this.tagField = page.getByPlaceholder('Enter tags');
    this.profileButton = page.getByRole('link', { name: 'your profile image' });
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
    await test.step(`Assert the article has correct tag'`, async () => {
      await expect(this.page.getByText(tag)).toBeVisible();
    });
  }
  async editArticleButtonClick() {
    await test.step(`Click edit Article button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async assertArticleDescriptionIsVisible(text) {
    // eslint-disable-next-line max-len
    await test.step(`Assert the article description is visible on the profile page`, async () => {
      await this.profileButton.click();
      await this.page.waitForURL('**/profile/**');
      await this.page.reload();
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
