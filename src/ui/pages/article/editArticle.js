import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';

export class EditArticleAction {
  constructor(page) {
    this.page = page;
    this.editArticlePage = new EditArticlePage(page);
  }

  async open(slug) {
    await this.editArticlePage.openFromArticleSlug(slug);
  }

  async editTitle(value) {
    await test.step(`Edit article title to "${value}"`, async () => {
      await this.editArticlePage.fillTitleField(value);
    });
  }

  async clearTitle() {
    await test.step(`Clear article title`, async () => {
      await this.editArticlePage.clearTitle();
    });
  }

  async editDescription(value) {
    await this.editArticlePage.fillDescriptionField(value);
  }

  async clearDescription() {
    await this.editArticlePage.clearDescription();
  }

  async editText(value) {
    await this.editArticlePage.fillTextField(value);
  }

  async clearText() {
    await this.editArticlePage.clearText();
  }

  async addTag(value) {
    await test.step(`Add tag "${value}"`, async () => {
      await this.editArticlePage.addTag(value);
    });
  }

  async removeTag(value) {
    await this.editArticlePage.removeTag(value);
  }

  async submit() {
    await this.editArticlePage.submitEditedArticle();
  }
}
