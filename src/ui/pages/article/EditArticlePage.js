import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(
      `What's this article about?`,
    );
    this.articleBodyField = page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.articleTagField = page.getByPlaceholder('Enter tags');
    this.updateButton = page.getByRole('button', { name: 'Update Article' });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async editArticleTitle(newTitle) {
    await test.step(
      `Edit article title in field with new text ${newTitle}`,
      async () =>
      {
        await this.articleTitleField.fill('');
        await this.articleTitleField.fill(newTitle);
    });
  }

  async editArticleBody(newText) {
    await test.step(
      `Edit article title in field with new text ${newText}`,
      async () =>
      {
        await this.articleBodyField.fill('');
        await this.articleBodyField.fill(newText);
      });
  }

  async editArticleDescription(newDescription) {
    await test.step(
      `Edit article description in field with new text ${newDescription}`,
      async () =>
      {
        await this.articleDescriptionField.fill('');
        await this.articleDescriptionField.fill(newDescription);
      });
  }

  async addNewTag(newTag) {
    await test.step(`Add new tag ${newTag} to article`, async () => {
      await this.articleTagField.fill(newTag);
      await this.page.keyboard.press('Enter');
    });
  }

  async removeArticleTag(removeTagName) {
    await test.step(
      `Click the remove article tag ${removeTagName}`,
      async () =>
      {
        await this.page.locator('form i').click();
      });
  }

  async removeArticleChoiceField(fieldName) {
    await test.step(
      `Remove article title in field ${fieldName}{}`,
      async () =>
      {
        // eslint-disable-next-line playwright/no-conditional-in-test
        switch (fieldName) {
          case 'title':
            await this.articleTitleField.fill('');
            break;
          case 'description':
            await this.articleDescriptionField.fill('');
            break;
          case 'body':
            await this.articleBodyField.fill('');
        }
      });
  }

  async clickUpdateArticleButton() {
    await test.step('Click update article button', async () => {
      await this.updateButton.click();
    });
  }

  async assertArticleDescriptionChanged(description) {
    await test.step(`Assert article description changed on ${description}`,
      async () => {
        await expect(this.articleDescriptionField).toHaveValue(description);
    });
  }

  async assertArticleFieldValidationError(errorMessage) {
    await test.step(`Assert article fieldValidationError ${errorMessage}`,
      async () => {
      await expect(this.errorMessage).toContainText(errorMessage);
    });
  }
}
