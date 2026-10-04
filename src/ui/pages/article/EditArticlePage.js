import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.tags = page.locator('.tag-list .tag-pill');
    this.errorMessage = page.locator('.error-messages');
  }

  async waitForArticleToLoad() {
    await test.step(`Wait for the article to load in the editor`, async () => {
      await expect(this.titleField).not.toBeEmpty();
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async clearTitleField() {
    await test.step(`Clear the 'Title' field`, async () => {
      await this.titleField.clear();
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async clearDescriptionField() {
    await test.step(`Clear the 'Description' field`, async () => {
      await this.descriptionField.clear();
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async clearTextField() {
    await test.step(`Clear the 'Text' field`, async () => {
      await this.textField.clear();
    });
  }

  async addTag(tag) {
    await test.step(`Add the '${tag}' tag`, async () => {
      await this.tagsField.fill(tag);
      await this.tagsField.press('Enter');
    });
  }

  async clearTags() {
    await test.step(`Remove all the tags`, async () => {
      const tagsCount = await this.tags.count();

      for (let i = 0; i < tagsCount; i++) {
        await this.tags.first().locator('.ion-close-round').click();
      }
    });
  }

  async removeTag(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      await this.tags
        .filter({ hasText: tag })
        .locator('.ion-close-round')
        .click();
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

  async assertDescriptionFieldHasValue(description) {
    await test.step(`Assert the 'Description' field value`, async () => {
      await expect(this.descriptionField).toHaveValue(description);
    });
  }

  async assertTagsAreNotEmpty() {
    await test.step(`Assert the article has tags`, async () => {
      await expect(this.tags).not.toHaveCount(0);
    });
  }

  async assertTagsAreVisible(tags) {
    await test.step(`Assert the article has the correct tags`, async () => {
      await expect(this.tags).toHaveText(tags);
    });
  }
}
