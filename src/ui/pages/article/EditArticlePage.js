import { CreateArticlePage } from './CreateArticlePage';
import { test, expect } from '@playwright/test';

export class EditArticlePage extends CreateArticlePage {
  constructor(page) {
    super(page);
  }

  // Otwiera stronę edycji artykułu o danym slug
  async open(slug) {
    await test.step(`Open Edit Article page for slug: ${slug}`, async () => {
      await this.page.goto(`/editor/${slug}`);
    });
  }

  // Możesz nadpisać dowolną metodę z CreateArticlePage, jeśli potrzebujesz specjalnego zachowania przy edycji
  async fillTitleField(title) {
    await super.fillTitleField(title);
  }

  async fillDescriptionField(description) {
    await super.fillDescriptionField(description);
  }

  async fillTextField(text) {
    await super.fillTextField(text);
  }

  async addTag(tag) {
    await super.addTag(tag);
  }

  async clickPublishArticleButton() {
    await super.clickPublishArticleButton();
  }

  async assertTagIsVisible(tag) {
    await super.assertTagIsVisible(tag);
  }

  async assertTagNotVisible(tag) {
    await super.assertTagNotVisible(tag);
  }

  async assertErrorMessageContainsText(messageText) {
    await super.assertErrorMessageContainsText(messageText);
  }
}
