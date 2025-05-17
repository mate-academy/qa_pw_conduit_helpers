import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async editTitleField(title) {
    await test.step(`Edit the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async editDescriptionField(description) {
    await test.step(`Edit the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async editTextField(text) {
    await test.step(`Edit the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async editTagField(tag) {
    await test.step(`Edit the 'Tag' field`, async () => {
      await this.textField.fill(tag);
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }
}
