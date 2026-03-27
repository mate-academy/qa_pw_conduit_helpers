import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.tagsChip = (tag) => page.locator('div.tag-list')
    .filter({ hasText: tag });
    this.tagChip = (tag) => page.locator('span.tag-pill')
    .filter({ hasText: tag }).locator('i');
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
      await this.page.keyboard.press('Enter');
    });
  }
  async fillTagsField(tags) {
  await test.step(`Fill the 'Tags' field`, async () => {
    for (const tag of tags) {
      await this.tagsField.fill(tag);
      await this.tagsField.press('Enter');
      await this.tagsChip(tag).waitFor();
      await this.tagsField.clear();
    }
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
  async removeAllTags(tags) {
  await test.step(`Remove all tags`, async () => {
    for (const tag of tags) {
      await this.tagChip(tag).click();
    }
  });
  }
  async clearArticleTitle() {
    await test.step(`Clear article title`, async () => {
      await this.titleField.clear();
    });
  }
  async clearArticleDescription() {
    await test.step(`Clear article description`, async () => {
      await this.descriptionField.clear();
    });
  }
  async clearArticleText() {
    await test.step(`Clear article text`, async () => {
      await this.textField.clear();
    });
  }
}