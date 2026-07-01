import { test, expect } from '@playwright/test';
import { CreateArticlePage } from './CreateArticlePage';

export class EditArticlePage extends CreateArticlePage {
  constructor(page) {
    super(page);

    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });

    this.removeTagButton = page.locator('.ion-close-round');
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async clickRemoveTagButton() {
    await test.step(`Click the 'Remove Tag' button`, async () => {
      await this.removeTagButton.click();
    });
  }

  async clearTitleField() {
    await test.step(`Clear the 'Title' field`, async () => {
      await this.titleField.fill('');
    });
  }

  async clearDescriptionField() {
    await test.step(`Clear the 'Description' field`, async () => {
      await this.descriptionField.fill('');
    });
  }

  async clearTextField() {
    await test.step(`Clear the 'Text' field`, async () => {
      await this.textField.fill('');
    });
  }

  async assertErrorMessageIsVisible(message) {
    await test.step(`Assert the error message is visible`, async () => {
      await expect(this.page.getByText(message)).toBeVisible();
    });
  }
}
