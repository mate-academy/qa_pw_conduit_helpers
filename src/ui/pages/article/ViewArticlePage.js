import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editAtricleButton = page
    .getByRole('link', { name: 'Edit Article' }).nth(0);
    this.existingTag = page
    .locator('li.tag-default.tag-pill.tag-outline').nth(0);
    this.newTag = page.
    locator('li.tag-default.tag-pill.tag-outline').nth(1);
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

  async openEditor() {
    await this.editAtricleButton.click();
  }

   async assertUpdatedArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertTagisVisible(tag) {
    await test.step(`Assert that tag is visible`, async() => {
      await expect(this.existingTagTag).toBeVisible(tag);
    });
  }

  async assertTagHasCorrectText(tag) {
    await test.step(`Assert tag has correct text`, async() => {
      await expect(this.existingTag).toHaveText(tag);
    });
  }

  /*async assertNewTagisVisible(tag) {
    await test.step(`Assert that new tag is visible`, async() => {
      await expect(this.newTag).toBeVisible(tag);
    });
  }*/

  async assertNewTagHasCorrectText(tag) {
    await test.step(`Assert new tag has correct text`, async() => {
      await expect(this.newTag).toHaveText(tag);
    });
  }

  async assertTagisDeleted() {
    await test.step(`Assert tag is deleted`, async() => {
      await expect(this.existingTag).toBeHidden();
    });
  }
}
