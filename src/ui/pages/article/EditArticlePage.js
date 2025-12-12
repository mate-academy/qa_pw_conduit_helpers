import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;

    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');

    this.updateArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async openFromArticleSlug(slug) {
    await test.step(`Open Edit Article page for slug: ${slug}`, async () => {
      await this.page.goto(`/editor/${slug}`);
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the Title field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the Description field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the Text field`, async () => {
      await this.textField.fill(text);
    });
  }

  async clearTitle() {
    await test.step(`Clear the Title field`, async () => {
      await this.titleField.fill('');
    });
  }

  async clearDescription() {
    await test.step(`Clear the Description field`, async () => {
      await this.descriptionField.fill('');
    });
  }

  async clearText() {
    await test.step(`Clear the Text field`, async () => {
      await this.textField.fill('');
    });
  }

  async addTag(tag) {
    await test.step(`Add tag: ${tag}`, async () => {
      await this.tagsField.fill(tag);
      await this.tagsField.press('Enter');
    });
  }

  async removeTag(tag) {
    await test.step(`Remove tag: ${tag}`, async () => {
      const tagElement = this.page.locator(`text=${tag} >> xpath=../i`);
      await tagElement.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the Update Article button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertErrorMessageContains(messageText) {
    await test.step(`Assert error message contains:
       "${messageText}"`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
