import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagtField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async open() {
    await test.step(`Open 'Create Article' page`, async () => {
      await this.page.goto('/editor', { waitUntil: 'commit' });
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillTagsField(tag) {
    await test.step(`Fill the 'Tags' field`, async () => {
      await this.tagtField.fill(tag);
      await this.tagtField.press('Enter');
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async removeArticleTag() {
    await test.step('Remove the tag from the article', async () => {
      await this.page.locator('form i').click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
