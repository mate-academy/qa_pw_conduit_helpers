import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.tagField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: /Publish Article|Update Article/,
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.editArticleButton = page
      .getByText('Edit Article', { exact: true })
      .first();
  }

  async open() {
    await test.step(`Open 'Edit Article' page`, async () => {
      await this.editArticleButton.click();
    });
  }

  async fillInputField(placeholderName, inputValue) {
    await test.step(`Fill the '${placeholderName}' field`, async () => {
      await this.page.getByPlaceholder(placeholderName).fill(inputValue);
    });
  }

  async fillTagInputField(inputValue) {
    await test.step(`Fill the '${inputValue}' field`, async () => {
      await this.tagField.fill(inputValue);
      await this.page.keyboard.press('Enter');
    });
  }

  async clearInputField(placeholderName) {
    await test.step(`Clear the '${placeholderName}' field`, async () => {
      await this.page.getByPlaceholder(placeholderName).fill('');
    });
  }

  async clearTagInputField(inputValue) {
    await test.step(`Clear the '${inputValue}' field`, async () => {
      await this.tagField.fill('');
    });
  }

  async removeTag(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      await this.page
        .locator('.tag-pill')
        .filter({ hasText: tag })
        .locator('i')
        .click();
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      const urlBeforeClick = this.page.url();
      await this.publishArticleButton.click();
      await new Promise(resolve => setTimeout(resolve, 300));
      if (this.page.url() !== urlBeforeClick) {
        await this.page.reload();
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
