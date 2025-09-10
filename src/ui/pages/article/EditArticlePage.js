import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDesc = page.getByPlaceholder(`What's this article about?`);

    this.articleText = page.getByPlaceholder('Write your article (in');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.articleTags = page.getByPlaceholder('Enter tags');
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async editArticleTitle(article) {
    await test.step(`Edit aticle title`, async () => {
      await this.articleTitle.fill(article.title);
    });
  }

  async removeTitle() {
    await test.step(`Remove aticle title`, async () => {
      await this.articleTitle.fill('');
    });
  }

  async editArticleDescription(article) {
    await test.step(`Edit aticle title`, async () => {
      await this.articleDesc.fill(article.description);
    });
  }

  async removeDescription() {
    await test.step(`Remove aticle title`, async () => {
      await this.articleDesc.fill('');
    });
  }

  async editArticleText(article) {
    await test.step(`Edit aticle title`, async () => {
      await this.articleText.fill(article.text);
    });
  }

  async removeText() {
    await test.step(`Remove aticle text`, async () => {
      await this.articleText.fill('');
    });
  }

  async editArticleTags(article) {
    await test.step('Update the Article Tags', async () => {
      for (const tag of article.tags) {
        await this.articleTags.fill(tag);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async removeArticleTag(tag) {
    await test.step('Remove a tag from article', async () => {
      const tagToBeRemoved = this.page.getByText(tag);
      await tagToBeRemoved.locator('.ion-close-round').click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click update article button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
