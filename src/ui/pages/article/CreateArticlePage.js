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
    this.tagField = page.getByPlaceholder('Enter tags');
    this.errorMessage = page.getByRole('list').nth(1);
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
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

  async fillTagField(tag) {
    await test.step(`Fill tag field`, async () => {
      await this.tagField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async fillEmptyData(field) {
    await test.step(`Fill the '${field}' field empty data`, async () => {
      const fields = {
        title: this.titleField,
        description: this.descriptionField,
        text: this.textField,
      };

      await fields[field].fill('');
    });
  }

  async createArticleWithRequiredFields(article) {
    await test.step('Creat an article with required fields', async () => {
      await this.fillTitleField(article.title);
      await this.fillDescriptionField(article.description);
      await this.fillTextField(article.text);
      await this.clickPublishArticleButton();
    });
  }

  async createArticleTagFields(article) {
    await test.step('Creat an article with required fields', async () => {
      await this.fillTitleField(article.title);
      await this.fillDescriptionField(article.description);
      await this.fillTextField(article.text);
      for (const tag of article.tags) {
        await this.fillTagField(tag);
      }
      await this.clickPublishArticleButton();
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

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertDescriptionFieldHasValue(description) {
    await test.step(
      `Assert the 'Description' field has value '${description}'`, async () => {
      await expect(this.descriptionField).toHaveValue(description);
    });
  }

    getRemoveTagButton(tag) {
    return this.page.getByText(tag, { exact: true }).locator('i');
  }

  async clickRemoveTagButton(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      await this.getRemoveTagButton(tag).click();
    });
  }
}
