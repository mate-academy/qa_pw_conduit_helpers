import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.profilelink = page.locator('.nav-link').last();
    this.articlePreview = page.locator('.article-preview');
  }

  async clickProfileLink() {
    await test.step(`Click the 'Profile' link`, async () => {
      await this.profilelink.click();
    });
  }

  async assertArticleDescriptionVisible(description) {
    await test.step(`Assert that article description is visible`, async () => {
      await expect(this.articlePreview).toContainText(description);
    });
  }
}
