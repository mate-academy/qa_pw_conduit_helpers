import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', { name: ' Edit Article' })
    .first();
    this.articleTextBody = page.locator('.article-content p');
    this.deleteArticleButton = page.getByRole('button', { 
      name: ' Delete Article' }).nth(1);
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    })
  }

    async clickDeleteArticleButton() {
    await test.step(`Click the 'Delete Article' button`, async () => {
      await this.deleteArticleButton.click();
    })
  }

    async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description`, async () => {
      await expect(this.page.getByText(description)).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
    await this.page.getByText(title).waitFor();
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.articleTextBody).toHaveText(text);
    });
  }

  async assertArticleTagIsVisible(tag) {
  await test.step(`Assert the article has the '${tag}' tag`, async () => {
    await expect(this.page.getByText(tag, { exact: true })).toBeVisible();
  });
}

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the article has no '${tag}' tag`, async () => {
      await expect(this.page.getByText(tag, { exact: true })).toBeHidden();
    });
  }

  async waitForEditArticleButtonIsVisible() {
    await this.editArticleButton.waitFor();
  }

  async reload() {
    await this.page.reload();
  }
}
