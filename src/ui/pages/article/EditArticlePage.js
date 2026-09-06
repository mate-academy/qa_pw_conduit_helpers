/* eslint-disable max-len */
import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
    this.titleField = page.getByPlaceholder('Article Title');
    this.tagLabel = page.locator('[class="tag-default tag-pill"]');
    this.removeTagButton = page.locator('form i'); 
    this.errorMessageText = page.locator(".error-messages").getByRole("listitem").last();
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);  
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click(); 
      await expect(this.updateArticleButton).toBeHidden();
      await this.page.reload();
    });
  }

  async removeTag() {
    await test.step(`Remove the tag`, async () => {
      await this.removeTagButton.click();
    });
  }

  async assertTagIsNotVisible(tag) {
    await test.step(`Assert the '${tag}' tag is not visible`, async () => {
      await expect(this.tagLabel).not.toContainText(tag);
    });
  }   

  async assertTagIsVisible(tag) {
    await test.step(`Assert the '${tag}' tag is visible`, async () => {
      await expect(this.tagLabel).toContainText(tag);
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessageText).toContainText(messageText);
    }); 
  }
}

