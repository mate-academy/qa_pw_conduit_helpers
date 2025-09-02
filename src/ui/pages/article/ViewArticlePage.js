import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleBtn = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async clickEditArticle() {
    await test.step(`Open editing mode for article`, async () => {
      await this.editArticleBtn.click();
    });
  }

  async waitForURLAndRefreshPage() {
    await test.step('Refresh page', async () => {
      await this.page.waitForURL('https://conduit.mate.academy/article/*');
      await this.page.reload();
    });
  }
}
