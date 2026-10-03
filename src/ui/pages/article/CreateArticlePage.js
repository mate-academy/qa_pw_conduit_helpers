import { expect, test } from '@playwright/test';

/**
 * Represents the article Editor page.
 * The Conduit app uses the same `/editor` form and layout both for
 * creating a new article and for editing an existing one, so this
 * Page Object is reused for both flows.
 */
export class CreateArticlePage {
  constructor(page) {
    this.page = page;

    this.titleField = page.getByPlaceholder('Article Title');

    this.descriptionField = page.getByPlaceholder(
      "What's this article about?",
    );

    this.textField = page.getByPlaceholder(
      'Write your article (in markdown)',
    );

    this.tagField = page.getByPlaceholder('Enter tags');

    this.tagList = page.locator('.tag-list');

    this.publishArticleButton = page.getByRole('button', {
      name: /Publish Article|Update Article/,
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

  async clearField(field) {
    await test.step(`Clear the field`, async () => {
      await field.clear();
    });
  }

  async addTag(tag) {
    await test.step(`Add the '${tag}' tag`, async () => {
      await this.tagField.fill(tag);
      await this.tagField.press('Enter');
    });
  }

  async removeTag(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      await this.tagList
        .locator('.tag-pill', { hasText: tag })
        .locator('i')
        .click();
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(
      `Assert error message contains '${messageText}'`,
      async () => {
        await expect(this.errorMessage).toContainText(messageText);
      },
    );
  }

  async assertTitleFieldHasValue(title) {
    await test.step(
      `Assert the 'Title' field has value '${title}'`,
      async () => {
        await expect(this.titleField).toHaveValue(title);
      },
    );
  }

  async assertDescriptionFieldHasValue(description) {
    await test.step(
      `Assert the 'Description' field has value '${description}'`,
      async () => {
        await expect(this.descriptionField).toHaveValue(description);
      },
    );
  }

  async assertTextFieldHasValue(text) {
    await test.step(
      `Assert the 'Text' field has value '${text}'`,
      async () => {
        await expect(this.textField).toHaveValue(text);
      },
    );
  }

  async assertTagIsVisible(tag) {
    await test.step(`Assert the '${tag}' tag is visible`, async () => {
      await expect(
        this.tagList.getByText(tag, { exact: true }),
      ).toBeVisible();
    });
  }

  async assertTagIsNotVisible(tag) {
    await test.step(`Assert the '${tag}' tag is not visible`, async () => {
      await expect(
        this.tagList.getByText(tag, { exact: true }),
      ).not.toBeVisible();
    });
  }
}
