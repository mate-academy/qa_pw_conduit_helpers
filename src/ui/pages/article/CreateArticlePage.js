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
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.errorMessage = page.getByRole('list').nth(1);
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.homeButton = page.getByRole('link', { name: 'Home' });
    this.globalFeedButton = page.getByText('Global Feed');
    this.deleteTagbutton = page.locator('form i');
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillNewTitleField(newTitle) {
    await test.step(`Fill the 'New Title' field`, async () => {
      await this.titleField.fill(newTitle);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillNewDescriptionField(newDescription) {
    await test.step(`Fill the 'New Description' field`, async () => {
      await this.descriptionField.fill(newDescription);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillNewTextField(newText) {
    await test.step(`Fill the 'New Text' field`, async () => {
      await this.textField.fill(newText);
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill tags' field`, async () => {
      const tagNames = tags.map(tag => tag.name);
      await this.tagsField.fill(tagNames.join(', '));
      await this.page.keyboard.press('Enter');
    });
  }

  async fillTagsField1(tag) {
    await test.step(`Fill tags' field`, async () => {
      await this.tagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async clickHomeButton() {
    await test.step(`Click the 'Home' button`, async () => {
      await this.homeButton.click();
    });
  }

  async clickGlobalFeedButton() {
    await test.step(`Click the 'Global Feed' button`, async () => {
      await this.globalFeedButton.click();
    });
  }

  async clickDeleteTagButton() {
    await test.step(`Click the 'Delete Tag' button`, async () => {
      await this.deleteTagbutton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
