import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();

    // Локатор для всіх тегів
    this.tagList = page.locator('.tag-list');
  }

  // 🔹 Допоміжний метод для отримання конкретного тегу
  getTagLocator(tag) {
    return this.tagList.locator('.tag-pill', { hasText: tag });
  }

  async assertArticleDescriptionIsNotVisible(description) {
    await test.step(`Assert the article's old description '${description}' is removed`, async () => {
      await expect(this.page.getByPlaceholder(`What's this article about?`)).toHaveCount(0);
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the article tag '${tag}' is visible`, async () => {
      await expect(this.getTagLocator(tag)).toBeVisible();
    });
  }

  async assertTagIsNotVisible(tag) {
    await test.step(`Assert the tag '${tag}' is removed`, async () => {
      await expect(this.getTagLocator(tag)).toHaveCount(0);
    });
  }
}
