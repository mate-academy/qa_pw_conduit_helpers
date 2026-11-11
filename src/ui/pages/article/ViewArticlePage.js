import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByText('Edit Article').nth(0);
    this.userProfileButton = page.locator('.nav-link[href^="/profile/"]');
  }

  async waitFor() {
    // eslint-disable-next-line max-len
    await test.step(`Wait until the View Article page URL changes`, async () => {
      await this.page.waitForURL('https://conduit.mate.academy/article/*');
    });
  }

  async reload() {
    await test.step(`Reload the View Article page`, async () => {
      await this.page.reload();
    });
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

  async assertArticleTagListIsVisible(tags) {
    await test.step(`Assert the article has correct tags'`, async () => {
      await expect(this.page.getByText(tags)).toBeVisible();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickUserProfileButton() {
    await test.step(`Click the 'User Profile' button`, async () => {
      await this.userProfileButton.click();
    });
  }

  async assertArticleTagIsHidden(tag) {
    await test.step(`Assert the article tag is not displayed'`, async () => {
      await expect(this.page.getByText(tag)).toBeHidden();
    });
  }
}
