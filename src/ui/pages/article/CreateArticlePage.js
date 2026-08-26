import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.tagPills = page.locator('.tag-list .tag-pill');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
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

  async fillTagsField(tag) {
    await test.step(`Fill the 'Tags' field with '${tag}'`, async () => {
      await this.tagsField.fill(tag);
      await this.tagsField.press('Enter');
    });
  }

  async removeTag(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      await this.tagPills
        .filter({ hasText: tag })
        .locator('i.ion-close-round')
        .click();
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertTagIsVisible(tag) {
    await test.step(`Assert the '${tag}' tag is visible`, async () => {
      await expect(this.tagPills.filter({ hasText: tag })).toBeVisible();
    });
  }

  async assertTagIsNotVisible(tag) {
    await test.step(`Assert the '${tag}' tag is not visible`, async () => {
      await expect(this.tagPills.filter({ hasText: tag })).toBeHidden();
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
}
