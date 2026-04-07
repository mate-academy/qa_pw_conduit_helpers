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
    this.lastTag = page.locator('.tag-pill').last();
    this.lastTagRemoveButton = page.locator('.ion-close-round').last();
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

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async fillTagField(tag) {
    await test.step(`Full 'tags' field`, async () => {
      await this.tagsField.fill(tag);
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertArticleTitleIsVisible (title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.titleField).toHaveValue(title);
    });
  }

  async assertArticleDescriptionIsVisible (description) {
    await test.step(`Assert the article has correct description'`, async () => {
      await expect(this.descriptionField).toHaveValue(description);
    });
  }

  async assertArticleTextIsVisible (text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.textField).toHaveValue(text);
    });
  }

  async assertArticleTagsIsVisible (text) {
    await test.step(`Assert the article has correct tags'`, async () => {
      await expect(this.lastTag).toHaveText(text);
    });
  }

  async deleteLastTag() {
    await test.step(`Remove tag`, async () => {
      await this.lastTagRemoveButton.click();
    });
  }

  async assertArticleTagsIsNotVisible () {
    await test.step('Assert there are no tags', async () => {
      await expect(this.lastTag).toHaveCount(0);
    });
  }
}
