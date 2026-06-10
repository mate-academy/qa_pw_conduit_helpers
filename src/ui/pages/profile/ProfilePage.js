import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  getArticleDescriptionLocator(descriptionText) {
    return this.page.getByRole('link', {
      name: `Article description: ${descriptionText}`,
    });
  }
  async assertArticleDescriptionIsVisible(descriptionText) {
    await test.step(`Verify the link for article "${descriptionText}" 
    is visible`, async () => {
      const descriptionLocator =
        this.getArticleDescriptionLocator(descriptionText);
      await expect(descriptionLocator).toBeVisible();
    });
  }
}
