import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.articleDescriptionLink = page
      .locator('a.preview-link p')
      .filter({
        hasText: 'Article description: ',
      })
      .nth(0);
  }

  async assertArticleDescriptionIsVisible(descriptionText) {
    await test.step(`Verify the link for article "${descriptionText}" 
    is visible`, async () => {
      await expect(this.articleDescriptionLink).toContainText(descriptionText);
    });
  }
}
