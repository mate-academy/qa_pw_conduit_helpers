import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder("What's this article about?");
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async updateTitleField(title) {
    await test.step(`Update the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async deleteFieldText(locator) {
    await test.step(`Delete the ${locator}`, async () => {
      await locator.clear();
    });
  }

  async updateDescriptionField(description) {
    await test.step(`Update the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async updateTextField(text) {
    await test.step(`Update the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async updateTagsField(tagsArray) {
    if (!Array.isArray(tagsArray) || !tagsArray.length) return;

    for (const tag of tagsArray) {
      await test.step(`Update tag: "${tag}"`, async () => {
        await this.tagsField.fill(tag);
        await this.page.keyboard.press('Enter');
      });
    }
  }

  async deleteTags(tagsArray) {
    if (!Array.isArray(tagsArray) || !tagsArray.length) return;

    for (const tag of tagsArray) {
      await test.step(`Delete tag: "${tag}"`, async () => {
        await this.page
          .locator('span')
          .filter({ hasText: tag })
          .locator('i')
          .click();
      });
    }
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
}
