import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.getByPlaceholder('Article Title');
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = page.getByPlaceholder('Enter tags');
    this.publishButton = page.getByRole('button', { name: 'Update Article' });
    this.errorMessage = page.getByRole('list').nth(1);
    this.tagPills = page.locator('.tag-list .tag-default');
  }

  async fillTitle(title) {
    await test.step(`Fill article title in edit form: "${title}"`, async () => {
      await this.titleInput.fill(title);
    });
  }

  async fillDescription(description) {
    await test.step(`Fill article description in edit form: "${description}"`, async () => {
      await this.descriptionInput.fill(description);
    });
  }

  async fillBody(body) {
    await test.step(`Fill article body in edit form: "${body}"`, async () => {
      await this.bodyInput.fill(body);
    });
  }

  
async addTag(tag) {
  await test.step(`Add tag "${tag}" in edit form`, async () => {
    await this.tagsInput.fill(tag);
    await this.tagsInput.press('Enter');
    // Перевіряємо, що тег додано в список форма редагування перед відправкою
    await expect(this.page.locator('.tag-list', { hasText: tag })).toBeVisible();
  });
}

  async removeTag(tagName) {
    await test.step(`Remove tag "${tagName}" in edit form`, async () => {
      // Клікаємо по іконці видалення (i) всередині блоку тега
      const tagPill = this.page.locator('.tag-default', { hasText: tagName });
      await tagPill.locator('i').click();
    });
  }

 async clickUpdateArticleButton() {
  await test.step("Click 'Update Article' button", async () => {
    await this.publishButton.click();
  });
  }


  async assertErrorMessageContainsText(expectedError) {
    await test.step(`Assert error message contains: "${expectedError}"`, async () => {
      await expect(this.errorMessage).toContainText(expectedError);
    });
  }
}