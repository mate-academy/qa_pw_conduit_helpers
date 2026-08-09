import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.publishArticleButton = page.getByRole('button', {
      name: /Publish Article|Update Article/,
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.tagInputField = page.getByPlaceholder('Enter tags');
  }

  tagPill(tag) {
    return this.page.locator('.tag-pill', { hasText: tag });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
      await this.titleField.blur();
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
      await this.descriptionField.blur();
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
      await this.textField.blur();
    });
  }

  async fillTagsField(tag) {
    await test.step(`Add the '${tag}' tag`, async () => {
      await this.tagInputField.fill(tag);
      await this.tagInputField.press('Enter');
    });
  }

  async addTags(tags) {
    await test.step(`Add tags to the article`, async () => {
      for (const tag of tags) {
        await this.fillTagsField(tag);
      }
    });
  }

  async removeTag(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      await this.tagPill(tag).locator('.ion-close-round').click();
    });
  }

  async assertTagIsVisible(tag) {
    await test.step(`Assert the '${tag}' tag is visible`, async () => {
      await expect(this.tagPill(tag)).toBeVisible();
    });
  }

  async assertTagIsNotVisible(tag) {
    await test.step(`Assert the '${tag}' tag is not visible`, async () => {
      await expect(this.tagPill(tag)).toBeHidden();
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