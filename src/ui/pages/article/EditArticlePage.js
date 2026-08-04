import { expect, test } from '@playwright/test';

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
    this.errorMessage = page.getByRole('list').nth(1);
    this.tagRemoveIcon = page.locator('.tag-list .tag-pill .ion-close-round');
    this.articleText = page.locator('.article-content .col-md-12');
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

  async addTags(tag) {
    await test.step(`Add tags to the 'Tags' field`, async () => {
      await this.tagsField.fill(tag);
      await this.tagsField.press('Enter');
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
      await this.page.waitForURL(/\/article\/.+/);
      await this.page.reload();
    });
  }

  async clickUpdateArticleButtonExpectingError() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async removeTag() {
    await test.step(`Remove the tag`, async () => {
      await this.tagRemoveIcon.click();
    });
  }

  async removeArticleTitle() {
    await test.step(`Remove title from 'Article Title' field`, async () => {
      await this.titleField.clear();
    });
  }

  async removeArticleDescription() {
    await test.step(`Remove description from 'What's this article about?'`, async () => {
      await this.descriptionField.clear();
    });
  }

  async removeArticleText() {
    await test.step(`Remove text from 'Write your article (in markdown)'`, async () => {
      await this.textField.clear();
    });
  }
}
