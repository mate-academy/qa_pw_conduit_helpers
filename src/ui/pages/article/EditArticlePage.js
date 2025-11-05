import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async editTitleField(title) {
    await test.step(`Edit the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async editDescriptionField(description) {
    await test.step(`Edit the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async editTextField(text) {
    await test.step(`Edit the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async addTagsField(tag) {
    await test.step(`Add a tag '${tag}'`, async () => {
      await this.tagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async removeTagsField(tag) {
    await test.step(`Remove the tag '${tag}'`, async () => {
      const tagElement = this.page.locator(`.tag-list .tag-default:has-text("${tag}")`);
      await tagElement.locator('i').click(); // <i class="ion-close-round"></i>
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
