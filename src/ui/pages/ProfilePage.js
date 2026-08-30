import {test, expect } from "@playwright/test"

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.articleLink = page.getByRole('link', { name: 'Article title:' })
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step('Assert article desctiprion is visible', async() => {
      await expect(this.page.getByText(description)).toBeVisible();
    })
  }
}