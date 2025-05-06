import { test, expect } from '@playwright/test';
import { EditArticlePage } from './EditArticlePage';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.errorMessage = page.locator('.error-messages');
    this.editArticlePage = new EditArticlePage(page);
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
      await this.editArticlePage.goToEditArticlePage();
      await expect(this.descriptionField).toHaveValue(description);
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
