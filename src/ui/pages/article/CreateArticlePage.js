import { expect, test } from '@playwright/test';
import { TITLE_CANNOT_BE_EMPTY } from '../../constants/articleErrorMessages';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../constants/articleErrorMessages';
import { ARTICLE_BODY_CANNOT_BE_EMPTY } from '../../constants/articleErrorMessages';
export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.tagsDelete = page.locator('span').locator('i').nth(0);
    this.ErorMesageTitleEmpty = page.getByText('Article title cannot be empty');
    this.ErorMesageDescriptionEmpty = page.getByText(
      'Article description cannot be',
    );
    this.ErorMesageBodyEmpty = page.getByText('Article body cannot be empty');
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

  async fillTagsField() {
    await test.step(`Added the article tags`, async () => {
      await this.tagField.fill('New Tags');
      await this.tagField.press('Enter');
      await this.publishArticleButton.click();
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
  async clickEditArticle() {
    await test.step(`Click Edit Article Button`, async () => {
      await this.editArticleButton.click();
    });
  }
  async editingArticleTitle() {
    await test.step(`Editing the article title`, async () => {
      await this.titleField.fill('New Article Title');
      await this.updateArticleButton.click();
    });
  }
  async editingDescriptionArticle() {
    await test.step(`Editing the article description`, async () => {
      await this.descriptionField.fill('New Description');
      await this.updateArticleButton.click();
    });
  }
  async editingTextArticle() {
    await test.step(`Editing the article text`, async () => {
      await this.textField.fill('New Text');
      await this.updateArticleButton.click();
    });
  }
  async addTagExistingArticleWithoutTags() {
    await test.step(`Add the tag existing article without tags`, async () => {
      await this.editArticleButton.click();
      await this.tagField.fill('New Tag');
      await this.page.keyboard.press('Enter');
      await this.updateArticleButton.click();
    });
  }
  async removingArticleTags() {
    await test.step(`Removing article tags`, async () => {
      await this.tagsDelete.click();
      await this.updateArticleButton.click();
    });
  }
  async removingArticleTitle() {
    await test.step(`Removing article title`, async () => {
      await this.titleField.fill('');
      await this.updateArticleButton.click();
      await expect(this.ErorMesageTitleEmpty).toContainText(
        TITLE_CANNOT_BE_EMPTY,
      );
    });
  }
  async removingDescriptionArticle() {
    await test.step(`Removing the article description`, async () => {
      await this.descriptionField.fill('');
      await this.updateArticleButton.click();
      await expect(this.ErorMesageDescriptionEmpty).toContainText(
        DESCRIPTION_CANNOT_BE_EMPTY,
      );
    });
  }
  async deletingArticleText() {
    await test.step(`Deleting the article text`, async () => {
      await this.textField.fill('');
      await this.updateArticleButton.click();
      await expect(this.ErorMesageBodyEmpty).toContainText(
        ARTICLE_BODY_CANNOT_BE_EMPTY,
      );
    });
  }
}
