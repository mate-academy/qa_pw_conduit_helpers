import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTagField = page.getByPlaceholder('Enter tags');
    this.articleTag = page.locator('.tag-pill');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
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

  async addArticleTag(tag) {
    await test.step(`Add tag to the article`, async () => {
      await this.articleTagField.fill(tag);
      await this.page.keyboard.press('Enter'); 
    })
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click on the 'Update Article' button`, async () => {
      await this.updateArticleButton.click()
    })
  }

  async getTagNames() {
    return await test.step(`Get added tag name`, async () => {
      return await this.articleTag.nth(1).allTextContents()
    })
  }

  async deleteAddedTag(tagName) {
    await test.step(`Delete '${tagName}' tag`, async() => {
      await this.page.getByText(tagName).locator('i').click()
    })
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
