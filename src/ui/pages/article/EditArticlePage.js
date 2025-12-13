import { test } from '@playwright/test';
import { CreateArticlePage } from './CreateArticlePage';

export class EditArticlePage extends CreateArticlePage {
  async open(slug) {
    await test.step(`Open Edit Article page for slug '${slug}'`, async () => {
      await this.page.goto(`/editor/${slug}`);
    });
  }

  async clickUpdateArticleButton() {
    await test.step("Click 'Update Article' button", async () => {
      const updateButton = this.page.getByRole('button', {
        name: 'Update Article',
      });
      await updateButton.click();
    });
  }

  async removeTag(tag) {
    await test.step(`Remove tag '${tag}'`, async () => {
      const tagElement = this.page
        .getByText(tag)
        .locator('..')
        .getByRole('button', { name: '×' });
      await tagElement.click();
    });
  }
}
