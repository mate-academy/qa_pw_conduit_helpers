import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', { name: ' Edit Article' }).nth(1);
    this.tagTextElement = page.locator('.tag-default.tag-pill.tag-outline');
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

  async clickOnEditArticleButton() {
    await test.step('Click on edit article button', async() => {
      await this.editArticleButton.click();
    })
  }

  async assertDescriptionTextIsVisible(text) {
    await test.step('Assert the Description has correct text', async() => {
      await expect(this.page.getByText(text)).toBeVisible();
    })
  }

  async assertEditArticleButtonIsHere() {
    await test.step('Assert Edit Article button is present', async() => {
      await expect(this.editArticleButton).toBeVisible();
    })
  }

  async assertTagTextIsHere() {
    await test.step('Assert Tag Text Is Here', async() => {
      await expect(this.tagTextElement).toBeVisible();
    })
  }

  async assertTagTextIsHidden() {
    await test.step('Assert Tag Text Is Hidden', async() => {
      await expect(this.tagTextElement).not.toBeVisible();
  })
}
}
