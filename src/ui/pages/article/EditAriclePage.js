import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {name: 'Update'});
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillArticleTitleWithNewData(title) {
    await test.step(`Fill Article Title With New Data`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillArticleDescriptionWithNewData(description) {
    await test.step(`Fill Article Description With New Data`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillArticleTextWithNewData(text) {
    await test.step(`Fill Article Text With New Data`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillArticleTagsWithNewData(tag) {
    await test.step(`Fill Article Tag With New Data`, async () => {
      await this.tagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`click 'Update article'`, async() => {
      await this.updateArticleButton.click();
    });
  }

  async removeTag(tag) {
    await test.step(`Remove ${tag} tag`, async() => {
      const parent = this.page.locator('span', { hasText: `${tag}` });
      await parent.locator('.ion-close-round').click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async clearArticleTitleField() {
    await test.step(`Clear article title`, async() => {
      await this.titleField.fill('');
    });
  }

  async clearArticleDescriptionField() {
    await test.step(`Clear article description`, async() => {
      await this.descriptionField.fill('');
    });
  }

  async clearArticleTextField() {
    await test.step(`Clear article text`, async() => {
      await this.textField.fill('');
    });
  }
}