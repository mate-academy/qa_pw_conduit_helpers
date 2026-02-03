import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title').first();
    this.descriptionField = page
      .getByPlaceholder(`What's this article about?`)
      .first();
    this.textField = page
      .getByPlaceholder('Write your article (in markdown)')
      .first();
    this.publishArticleButton = page.getByRole('button', {
      name: /Publish Article|Update Article/,
    });
    this.tagsInput = page.getByPlaceholder('Enter tags').first();
    this.errorMessage = page.getByRole('list').nth(1);
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

  async fillTagsField(tags) {
    await test.step(`Fill the 'Tags' field`, async () => {
      for (const tag of tags) {
        await this.tagsInput.fill(tag);
        await this.tagsInput.press('Enter');
      }
    });
  }

  async addTag(tag) {
    await test.step(`Add the tag '${tag}'`, async () => {
      await this.tagsInput.fill(tag);
      await this.tagsInput.press('Enter');
    });
  }

  async removeTag(tag) {
    await test.step(`Remove the tag '${tag}'`, async () => {
      const tagPill = this.page.locator('.tag-pill, .tag-default').filter({
        hasText: new RegExp(`^${tag}$`),
      });
      const removeButton = tagPill
        .locator('button, .ion-close-round, [class*="close"]');
      await removeButton.first().click();
    });
  }

  async clearTitleField() {
    await test.step(`Clear the 'Title' field`, async () => {
      await this.titleField.clear();
    });
  }

  async clearDescriptionField() {
    await test.step(`Clear the 'Description' field`, async () => {
      await this.descriptionField.clear();
    });
  }

  async clearTextField() {
    await test.step(`Clear the 'Text' field`, async () => {
      await this.textField.clear();
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
