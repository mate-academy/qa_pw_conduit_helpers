import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;

    this.articleTitleHeader = page.getByRole('heading');
<<<<<<< HEAD
    this.editArticleLink = page.getByRole('link', { name: 'Edit Article' })
    .first();
    this.tagList = page.locator('.tag-list');
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click();
=======

    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();

    this.deleteArticleButton = page
      .getByRole('button', { name: 'Delete Article' })
      .first();
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickDeleteArticleButton() {
    await test.step(`Click the 'Delete Article' button`, async () => {
      await this.deleteArticleButton.click();
>>>>>>> f147772603554f85c0a19f52b8583ed04d72f12d
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertEditArticleLinkIsNotVisible() {
    await test.step(
      `Assert the 'Edit Article' link is not visible`,
      async () => {
        await expect(this.editArticleLink).not.toBeVisible();
      },
    );
  }

  async assertTagIsVisible(tag) {
    await test.step(`Assert the '${tag}' tag is visible`, async () => {
      await expect(this.tagList.getByText(tag, { exact: true })).toBeVisible();
    });
  }

  async assertTagIsNotVisible(tag) {
    await test.step(`Assert the '${tag}' tag is not visible`, async () => {
      await expect(
        this.tagList.getByText(tag, { exact: true }),
      ).not.toBeVisible();
    });
  }

  getArticleUrl() {
    return this.page.url();
  }
}
