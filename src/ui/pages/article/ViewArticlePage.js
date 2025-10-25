import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
  }

  async clickEditArticleButton() {
    await test.step(`Click Edit Article button`, async () => {
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
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description'`, async () => {
      await expect(this.page.getByText(description)).toBeVisible();
    });
  }

  async assertCorrectTagsAreVisible(tags) {
    await test.step(`Assert the article has correct tags'`, async () => {
      for (let tag of tags) {
        await expect(this.page.getByText(tag, { exact: true })).toBeVisible();
      }
    });
  }

  async assertCorrectTagsIsNotVisible(tag) {
    await test.step(`Assert the article hasn't a tag'`, async () => {
        await expect(
          this.page.getByText(tag, { exact: true })
        ).toBeHidden();
    });
  }
}
