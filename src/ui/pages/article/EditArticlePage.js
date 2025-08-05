import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder("What's this article about?");
    this.textField = page.getByPlaceholder('Write your article (in');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.removeTagButton = page.locator('span > i').nth(0);
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async editArticleTitle(text) {
    await test.step(`edit article title`, async () => {
      await this.titleField.fill(text);
    });
  }

  async editArticleDescription(text) {
    await test.step(`edit article description`, async () => {
      await this.descriptionField.fill(text);
    });
  }

  async editArticleText(text) {
    await test.step(`edit article text`, async () => {
      await this.textField.fill(text);
    });
  }

  async addTag(text) {
    await test.step(`Add tag to the article`, async () => {
      await this.tagField.fill(text);
      await this.page.keyboard.press('Enter');
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async removeTag() {
    await test.step(`Remove tag`, async () => {
      await this.removeTagButton.click();
    });
  }

  async assertTagIsDeleted() {
    await test.step(`Assert tag is deleted`, async () => {
      await expect(this.removeTagButton).toBeHidden();
    });
  }
  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
