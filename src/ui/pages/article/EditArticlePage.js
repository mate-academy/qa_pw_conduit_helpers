/* eslint-disable max-len */
import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
    this.titleField = page.getByPlaceholder('Article Title');
    this.tagLabel = page.locator('[class="tag-default tag-pill"]');
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click(); 
      await expect(this.updateArticleButton).toBeHidden();
      await this.page.reload();
    });
  }

  async assertTagIsVisible(tag) {
    await test.step(`Assert the '${tag}' tag is visible`, async () => {
      await expect(this.tagLabel).toContainText(tag);
    });
  }
}

