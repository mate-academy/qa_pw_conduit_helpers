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
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.editArticleLink = page.getByRole('link', { name: 'Edit Article' }).first();
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.click();
      await this.titleField.press('Control+A');
      await this.titleField.type(title);
    });
  }

  async clearTitleField() {
    await test.step(`Clear the 'Title' field`, async () => {
      await this.titleField.click();
      await this.titleField.press('Control+A');
      await this.titleField.press('Backspace');
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.click();
      await this.descriptionField.press('Control+A');
      await this.descriptionField.type(description);
    });
  }

  async clearDescriptionField() {
    await test.step(`Clear the 'Description' field`, async () => {
      await this.descriptionField.click();
      await this.descriptionField.press('Control+A');
      await this.descriptionField.press('Backspace');
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.click();
      await this.textField.press('Control+A');
      await this.textField.type(text);
    });
  }

  async clearTextField() {
    await test.step(`Clear the 'Text' field`, async () => {
      await this.textField.click();
      await this.textField.press('Control+A');
      await this.textField.press('Backspace');
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill the 'Tags' field`, async () => {
      if (tags && tags.length > 0) {
        for (const tag of tags) {
          await this.tagsField.fill(tag);
          await this.tagsField.press('Enter');
        }
      }
    });
  }

  async removeTag(tagText) {
    await test.step(`Remove tag '${tagText}'`, async () => {
      const tagElement = this.page.locator('.tag-default', { hasText: tagText });
      const removeIcon = tagElement.locator('.ion-close-round');
      await removeIcon.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
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
