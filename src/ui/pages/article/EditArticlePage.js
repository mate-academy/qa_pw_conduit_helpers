import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleTextField = page.getByPlaceholder('Write your article (in');
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.articleTagLocator = page.locator('form i');
    this.articleDescriptionField = page.getByPlaceholder(
      "What's this article about?",
    );

    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });

    this.emptyTitleErrorMsg = page
      .locator('ul')
      .filter({ hasText: 'Article title cannot be empty' });

    this.emptyDescriptionErrorMsg = page
      .locator('ul')
      .filter({ hasText: 'Article description cannot be empty' });

    this.emptyTextErrorMsg = page
      .locator('ul')
      .filter({ hasText: 'Article body cannot be empty' });
  }

  async editArticleTitleField(title) {
    await test.step(`Edit article title > existing article`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async editArticleDescriptionField(description) {
    await test.step(`Edit article description > existing article`, async () => {
      await this.articleDescriptionField.fill(description);
    });
  }

  async editArticleTextField(text) {
    await test.step(`Edit article text > existing article`, async () => {
      await this.articleTextField.fill(text);
    });
  }

  async addArticleTagsField(tag) {
    await test.step(`Add tag for existing article without tags`, async () => {
      await this.articleTagsField.fill(tag);
      await this.articleTagsField.press('Enter');
    });
  }

  async removeArticleTag() {
    await test.step(`Remove articlTag for existing articlWithTag`, async () => {
      await this.articleTagLocator.click();
    });
  }

  async removeArticleTitleField() {
    await test.step(`Remove article title for existing article`, async () => {
      await this.articleTitleField.clear();
    });
  }

  async removeArticleDescriptionField() {
    await test.step(`Remove article Description for existArticle`, async () => {
      await this.articleDescriptionField.clear();
    });
  }

  async removeArticleTextField() {
    await test.step(`Remove articleText for existing Article`, async () => {
      await this.articleTextField.clear();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertEmptyTitleError(messageText) {
    await test.step('Assert title empty error is shown', async () => {
      await expect(this.emptyTitleErrorMsg).toContainText(messageText);
    });
  }

  async assertEmptyDescriptionError(messageText) {
    await test.step('Assert description empty error is shown', async () => {
      await expect(this.emptyDescriptionErrorMsg).toContainText(messageText);
    });
  }

  async assertEmptyTextError(messageText) {
    await test.step('Assert Text empty error is shown', async () => {
      await expect(this.emptyTextErrorMsg).toContainText(messageText);
    });
  }
}
