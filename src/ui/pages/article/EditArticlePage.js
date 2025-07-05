import { test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder("What's this article about?");
    this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button',
       { name: 'Update Article' });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async open(slug) {
    await this.page.goto(`/editor/${slug}`);
  }

  async fillTitleField(title) {
    await test.step('Fill in the title field', async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step('Fill in the description field', async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillBodyField(body) {
    await test.step('Fill in the body field', async () => {
      await this.bodyField.fill(body);
    });
  }

  async fillTag(tag) {
    await test.step('Fill in the tag field', async () => {
      await this.tagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async clearTitleField() {
    await test.step('Clear the title field', async () => {
      await this.titleField.fill('');
    });
  }

  async clearDescriptionField() {
    await test.step('Clear the description field', async () => {
      await this.descriptionField.fill('');
    });
  }

  async clearBodyField() {
    await test.step('Clear the body field', async () => {
      await this.bodyField.fill('');
    });
  }

  async removeTag(tagText) {
    await test.step(`Remove tag '${tagText}'`, async () => {
      // eslint-disable-next-line max-len
      const tagRemoveButton = this.page.locator(`.tag-list >> text=${tagText}`).locator('xpath=..').locator('i');
      await tagRemoveButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step('Click Publish Article button', async () => {
      await this.updateArticleButton.click();
    });
  }
} 