import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.deleteTagButton = page.locator(
      '.tag-default.tag-pill >> .ion-close-round',
    );
    this.errorMessage = page.getByRole('list').nth(1);
    this.tagText = page.getByText('tag-default');
  }

  async open() {
    await test.step(`Open 'New Article' page`, async () => {
      await this.page.goto('/editor');
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillTagField(tag) {
    if (!tag) {
      return;
    }

    await test.step(`Fill the 'Tag' field`, async () => {
      await this.tagField.fill(tag);
      await this.tagField.press('Enter');
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

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async clickDeletTagButton() {
    await test.step(`Click the 'Delete Tag' button`, async () => {
      await this.deleteTagButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertDescriptionFieldHasValue(expectedValue) {
    await test.step(`Assert description field has value "${expectedValue}"`, async () => {
      await expect(this.descriptionField).toHaveValue(expectedValue);
    });
  }

  async assertTagTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertTagTextIsNotVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeHidden();
    });
  }
}
