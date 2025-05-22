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
    this.errorMessage = page.getByRole('list').nth(1);
    this.tagField = page.getByPlaceholder('Enter tags');
    this.UpdateArticleButton = page.getByRole('button', {name: 'Update Article'});
    this.deleteTagElement = page.locator('.ion-close-round');
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

  /*async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  } */

  async fillTagField(text) {
    await test.step('Fill tag field', async() => {
      await this.tagField.fill(text);
      await this.page.keyboard.press('Enter');
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async clickOnPublishArticleButton() {
    await test.step('Click on Publish Article Button', async() => {
      await this.publishArticleButton.click();
    });
  }


  async clickOnUpdateArticleButton() {
    await test.step('Click on Update article button', async() => {
      await this.UpdateArticleButton.click();
    });
  }

  async clickOnDeleteTagButton() {
    await test.step('Click on Delete Tag button', async() => {
      await this.deleteTagElement.click();
    });
  }
}
