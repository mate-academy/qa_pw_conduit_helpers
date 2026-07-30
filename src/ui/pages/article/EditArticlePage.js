import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field with: ${title}`, async () => {
      await expect(this.titleField).not.toHaveValue('');
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' 
      field with: ${description}`, async () => {
      await expect(this.descriptionField).not.toHaveValue('');
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field with: ${text}`, async () => {
      await expect(this.textField).not.toHaveValue('');
      await this.textField.fill(text);
    });
  }

  async clearTitleField() {
    await test.step(`Clear the 'Title' field`, async () => {
      await this.titleField.click();
      await this.titleField.clear();
    });
  }

  async clearDescriptionField() {
    await test.step(`Clear the 'Description' field`, async () => {
      await this.descriptionField.click();
      await this.descriptionField.clear();
    });
  }

  async clearBodyField() {
    await test.step(`Clear the 'Body' field`, async () => {
      await this.bodyField.click();
      await this.bodyField.clear();
    });
  }

  async fillTag(tag) {
    await test.step(`Fill the 'Tag' field with: ${tag}`, async () => {
      await this.tagField.fill(tag);
      await this.tagField.press('Enter');
    });
  }

  async removeTag() {
    await test.step(`Remove article tag`, async () => {
      const removeTagButton = this.page
        .locator('.tag-pill .ion-close-round')
        .first();
      await removeTagButton.click();
      await expect(this.page.locator('.tag-pill')).toBeHidden();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
