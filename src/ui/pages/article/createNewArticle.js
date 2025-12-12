import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';

export class CreateNewArticleAction {
  constructor(page) {
    this.page = page;
    this.createArticlePage = new CreateArticlePage(page);
  }

  async openPage() {
    await this.createArticlePage.open();
  }

  async fillForm(article) {
    await this.createArticlePage.fillTitleField(article.title);
    await this.createArticlePage.fillDescriptionField(article.description);
    await this.createArticlePage.fillTextField(article.text);

    if (article.tags?.length > 0) {
      for (const tag of article.tags) {
        await test.step(`Add tag "${tag}"`, async () => {
          await this.createArticlePage.fillTagsField(tag);
          await this.page.keyboard.press('Enter');
        });
      }
    }
  }

  async submit() {
    await this.createArticlePage.clickPublishArticleButton();
  }

  async createNewArticle(article) {
    await this.openPage();
    await this.fillForm(article);
    await this.submit();
  }
}
