import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.tagItem = page.locator('.tag-list .ion-close-round');
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

  async fillTagField(tags, clearTags) {
    if (clearTags === 0) {
      await test.step('Remove all tags', async () => {
        while ((await this.tagItem.count()) > 0) {
          await this.tagItem.first().click();
        }
      });
    } else if (clearTags > 0) {
      await test.step(`Remove ${clearTags} tag(s)`, async () => {});
      for (let i = 0; i < clearTags; i++) {
        if ((await this.tagItem.count()) === 0) break;
        await this.tagItem.first().click();
      }
    }

    if (tags && tags.length) {
      await test.step(`Fill the 'Tag' field`, async () => {
        for (const tag of tags) {
          await this.tagField.fill(tag);
          await this.page.keyboard.press('Enter');
        }
      });
    } else {
      await test.step(`Skip the 'Tag' field filling`, async () => {});
    }
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
