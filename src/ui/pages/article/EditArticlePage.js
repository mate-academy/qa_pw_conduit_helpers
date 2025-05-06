import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.editPage = page.getByRole('link', {name: 'Edit Article'});
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {name: 'Update Article'});
  }

  async goToEditArticlePage() {
    await test.step('go to edit article page', async () => {
      await this.editPage.nth(1).click();
    });
  };

  async editArticleTitleField(title) {
    await test.step('edit article title field', async () => {
      await this.titleField.fill(title);
    });
  };

  async deleteArticleTitleValue() {
    await test.step('delete article title value', async () => {
      await this.titleField.fill('');
    });
  };

  async editArticleDescriptionField(title) {
    await test.step('edit article description field', async () => {
      await this.descriptionField.fill(title);
    });
  };

  async deleteArticleDescriptionValue() {
    await test.step('delete article description', async () => {
      await this.descriptionField.fill('');
    });
  };

  async editArticleTextField(text) {
    await test.step('edit article text field', async () => {
      await this.textField.fill(text);
    });
  };

  async deleteArticleTextValue() {
    await test.step('delete article text', async () => {
      await this.textField.fill('');
    })
  }

  async editTagField(tag) {
    await test.step('edit tag field', async () => {
      await this.tagField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  };

  async clickUpdateArticleButton() {
    await test.step('click update acticle button', async () => {
      await this.updateArticleButton.click();
    });
  };

  async deleteArticleTag(tagName) {
    await test.step('delete tag', async () => {
      const deleteIcon = this.page.locator(`span.tag-default:has-text("${tagName}") i.ion-close-round`);
      await deleteIcon.click();
    });
  }
};
