import { test, expect } from '@playwright/test';
import { EditArticlePage } from './EditArticlePage';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.errorMessage = page.locator('.error-messages');
    this.mainPage = page.locator('.navbar-brand', {hasText: 'conduit'});
    this.globalFeed = page.locator('.nav-item', {hasText: 'Global Feed'});
    this.descriptionOnGlobalFeed = page.locator('.preview-link p').first();
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleDescription(description) {
    await test.step('assert article description is updated', async () => {
      await this.mainPage.click();
      await this.globalFeed.click();
      await expect(this.descriptionOnGlobalFeed).toContainText(description);
    })
  }

  async assertArticleTagIsVisible(tag) {
    await test.step('assert article tag is visible', async () => {
      await expect(this.page.locator('.tag-list')).toContainText(tag);
    })
  }

  async assertArticleTagIsHidden(tag) {
    await test.step('assert article tag is hidden', async () => {
      await expect(this.page.locator('.tag-list')).toBeHidden(tag);
    })
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async waitForNavigationAndReload() {
    await this.page.waitForNavigation();
    await this.page.reload();
  }
}
