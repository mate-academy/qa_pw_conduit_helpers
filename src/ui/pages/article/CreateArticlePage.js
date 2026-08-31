import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.tagField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillInputField(placeholderName, inputValue) {
    await test.step(`Fill the '${placeholderName}' field`, async () => {
      await this.page.getByPlaceholder(placeholderName).fill(inputValue);
    });
  }

  async fillTagInputField(inputValue) {
    await test.step(`Fill the '${inputValue}' field`, async () => {
      await this.tagField.fill(inputValue);
      await this.page.keyboard.press('Enter');
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
