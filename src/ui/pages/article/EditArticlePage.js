import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.enterTags = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.tagPillsInForm = page.locator('.tag-list span.tag-pill');
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async editTitleField(newTitle) {
    await test.step(`Edit the 'Title' field`, async () => {
      await this.titleField.fill(newTitle);
    });
  }

  async editDescriptionField(newDescription) {
    await test.step(`Edit the 'Description' field`, async () => {
      await this.descriptionField.fill(newDescription);
      await expect(this.descriptionField).toHaveValue(newDescription);
    });
  }

  async editTextField(newText) {
    await test.step(`Edit the 'Text' field`, async () => {
      await this.textField.fill(newText);
    });
  }

  async enterTagsField(tags) {
    await test.step(`Enter tags into field`, async () => {
      await this.enterTags.fill(tags);
      await this.page.keyboard.press('Enter');
      await expect(this.tagPillsInForm.filter({ hasText: tags })).toBeVisible();
    });
  }

  async removeTag(tag) {
    await test.step(`Remove existing tag`, async () => {
      await this.tagPillsInForm
        .filter({ hasText: tag })
        .locator('i.ion-close-round')
        .click();
      await expect(this.tagPillsInForm.filter({ hasText: tag })).toBeHidden();
    });
  }

  async clickUpdateArticleButton() {
    await test.step('Click "Update Article" button', async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertTagIsVisible(tag) {
    await test.step('Assert tag is visible', async () => {
      await expect(
        // this.tagPillsInForm.filter({ hasText: new RegExp(`^${tag}$`) }),
        this.tagPillsInForm.filter({ hasText: tag }),
      ).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct Title`, async () => {
      await expect(this.titleField).toHaveValue(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.textField).toHaveValue(text);
    });
  }

  async assertDescriptionIsVisible(description) {
    await test.step('Assert the article has correct Description', async () => {
      await expect(this.descriptionField).toHaveValue(description);
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
