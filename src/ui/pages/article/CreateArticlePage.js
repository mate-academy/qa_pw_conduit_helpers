import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);

    // NOWE: pole tagów
    this.tagField = page.getByPlaceholder('Enter tags');
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await expect(this.titleField).toBeVisible();
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await expect(this.descriptionField).toBeVisible();
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await expect(this.textField).toBeVisible();
      await this.textField.fill(text);
    });
  }

  async addTag(tag) {
    await test.step(`Add tag '${tag}'`, async () => {
      await expect(this.tagField).toBeVisible();
      await this.tagField.fill(tag);
      await this.tagField.press('Enter'); // lub klik Add w UI
      const addedTag = this.page.getByText(tag);
      await expect(addedTag).toBeVisible();
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await expect(this.publishArticleButton).toBeEnabled();
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertTagIsVisible(tag) {
    const addedTag = this.page.getByText(tag);
    await expect(addedTag).toBeVisible();
  }

  async assertTagNotVisible(tag) {
    const addedTag = this.page.getByText(tag);
    await expect(addedTag).not.toBeVisible();
  }
  async open() {
    await test.step('Open Create Article page', async () => {
      await this.page.goto('/editor');
    });
  }
}
