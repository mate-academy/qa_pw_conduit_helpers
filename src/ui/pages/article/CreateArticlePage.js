import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTag = page.getByRole('textbox', { name: 'Enter tags' });
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
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

  async fillArticleTag(articleTag) {
    await test.step(`Fill the 'Article Tag' field`, async () => {
      await this.articleTag.fill(articleTag);
      await this.page.keyboard.press('Enter');
    });
  }

  async fillArticleTags(tags) {
    await test.step('Fill article with generated tags', async () => {
      for (const tag of tags) {
        await this.articleTag.fill(tag);
        await this.page.keyboard.press('Enter');
      }
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

  async assertArticleTitleVisible() {
    await test.step('Assert the Article title is visible', async () => {
      await expect(this.titleField).toBeVisible();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertArticleDescriptionIsUpdated(text) {
    await test.step(`Assert the article has correct description`, async () => {
      await expect(this.descriptionField).toHaveAttribute('value', text);
    });
  }

  getTagRemoveLocator(tagName) {
    return this.page.locator('span', { hasText: `${tagName}` }).locator('i');
  }

  async removeTag(tagName) {
    await test.step('Remove tag', async () => {
      await this.getTagRemoveLocator(tagName).click();
    });
  }
}
