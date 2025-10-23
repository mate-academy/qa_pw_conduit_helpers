import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = this.page.getByPlaceholder('Article Title');
    this.descriptionField = this.page.getByPlaceholder(`What's this article about?`);
    this.textField = this.page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = this.page.getByPlaceholder('Enter tags');
    this.tagList = this.page.locator('.tag-list > .tag-pill');
    this.firstTagDeleteButton = this.page.locator('.tag-list > .tag-pill > .ion-close-round').first();
    this.publishArticleButton = this.page.getByRole('button', {
      name: 'Publish Article',
    });
    this.updateArticleButton = this.page.getByRole('button', {
      name: 'Update Article'
    });
    this.errorMessage = this.page.getByRole('list').nth(1);
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

  async addArticleTags(tags) {
    await test.step(`Add 'Article' tags`, async () => {
      for (const tagName of tags) {
        await this.tagsField.fill(tagName);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async removeFirstTag() {
    await test.step(`Remove first tag`, async () => {
      await this.firstTagDeleteButton.click();
    });
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

  async assertTitleInputContainsText(title) {
    await test.step(`Assert the 'Title input' contains ${title}`, async () => {
      await expect(this.titleField).toHaveValue(title);
    });
  }

  async assertDescriptionInputContainsText(description) {
    await test.step(`Assert the 'Description input' contains ${description}`, async () => {
      await expect(this.descriptionField).toHaveValue(description);
    });
  }

  async assertTextInputContainsText(bodyText) {
    await test.step(`Assert the 'Body text input' contains ${bodyText}`, async () => {
      await expect(this.textField).toHaveValue(bodyText);
    });
  }

  async assertUpdateArticleButtonIsVisible() {
    await test.step(`Assert the 'Update Article' button is visible`, async () => {
      await expect(this.updateArticleButton).toBeVisible();
    });
  }

  async assertTagsListContainsTags(expectedTags) {
    await test.step(`Assert the '${expectedTags}' tags are shown`, async () => {
      await expect(this.tagList.first()).toBeVisible();
      const tagElements = await this.tagList.allTextContents();

      for (const expectedTag of expectedTags) {
        expect(tagElements).toContain(expectedTag);
      }
    });
  }

  async assertTagsListCount(expectedTagsCount) {
    await test.step(`Assert the '${expectedTagsCount}' tags are shown`, async () => {
      await expect(this.tagList.first()).toBeVisible();
      const tagElementsCount = await this.tagList.count();

      expect(tagElementsCount).toEqual(expectedTagsCount);
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
