import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagInput = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async clearTitle() {
    await test.step(`Clear the 'Title' field`, async () => {
      await this.titleField.clear();
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async clearDescription() {
    await test.step(`Clear the 'Description' field`, async () => {
      await this.descriptionField.clear();
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async clearText() {
    await test.step(`Clear the 'Text' field`, async () => {
      await this.textField.clear();
    });
  }

  async addTag(tag) {
    await test.step(`Add tag '${tag}'`, async () => {
      await this.tagInput.fill(tag);
      await this.tagInput.press('Enter');
    });
  }

  async removeTag(tag) {
    await test.step(`Remove tag '${tag}'`, async () => {
      const tagPill = this.page.locator('.tag-list li').filter({ hasText: tag });
      const removeButton = tagPill.getByRole('button');
      const count = await tagPill.count();
      if (count === 0) {
        throw new Error(`Tag '${tag}' not found to remove`);
      }
      await removeButton.click();
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
