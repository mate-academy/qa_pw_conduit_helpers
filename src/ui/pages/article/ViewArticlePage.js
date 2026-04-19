import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole(
      'link', {name: ' Edit Article'}).first();
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

  async clickEditArticleButton() {
    await test.step(`Click 'Edit article' button`, async() =>{
      await this.editArticleButton.click();
    });
  }

  async assertArticleTitleHasText(title) {
    await test.step(`Assert the article has new correct title'`, async () => {
      await this.page.reload();
      await expect(this.articleTitleHeader).toHaveText(title);
    });
  }

  async assertArticleNewTagIsVisible(tag) {
    await test.step(`Assert the article has correct new tag'`, async () => {
      await this.page.reload();
      await expect(this.page.getByText(tag)).toBeVisible();
    });
  }

  async assertArticleRemovedTagIsNotVisible(tag) {
    await test.step(`Assert the article has no removed tag'`, async () => {
      await this.page.reload();
      await expect(this.page.getByText(tag)).toBeHidden();
    });
  }
}
