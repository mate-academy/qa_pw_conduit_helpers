import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: /Publish Article|Update Article/,
    });
    this.editArticleField = page.getByText('Edit Article', {exact: true}).first();
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async open() {
    await test.step(`Open 'Edit Article' page`, async () => {
      await this.editArticleField.click();
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

  async fillTagField(tag) {
    await test.step(`Fill the 'Tag' field`, async () => {
      await this.tagField.fill(tag);
      await this.tagField.press('Enter');
    });
  }

  async removeTag(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      await this.page.locator('.tag-pill').filter({ hasText: tag }).locator('i').click();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleField.click();
    });
  }
async removeTitleField() {
    await test.step(`Remove the 'Title' field`, async () => {
      await this.titleField.fill('');
    });}

 async removeDescriptionField() {
    await test.step(`Remove the 'Description' field`, async () => {
      await this.descriptionField.fill('');
    });
  }
    async removeTextField() {
    await test.step(`Remove the 'Text' field`, async () => {
      await this.textField.fill('');
    });
  }

    async removeTagField() {
    await test.step(`Remove the 'Tag' field`, async () => {
      await this.tagField.fill('');
    }); 

  }
  async clickPublishArticleButton(reloadPage = true) {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
      if (reloadPage) {
        await this.page.waitForLoadState('networkidle');
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
      }
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
