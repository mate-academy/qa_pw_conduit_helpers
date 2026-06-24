import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  // getArticleDescriptionLocator(descriptionText) {
  //   return this.page.getByRole('link', {
  //     name: `Article description: ${descriptionText}`,
  //   });
  // }
  
  async assertArticleDescriptionIsVisible(descriptionText) {
    await test.step(`Verify the link for article "${descriptionText}" 
    is visible`, async () => {
      await expect(
        this.page.getByText(`Article description: ${descriptionText}`)
      ).toBeVisible();
    });
  }

  // clickProfileLink
  async clickProfileLink(authorName) {
    await test.step(`Click the profile link for ${authorName}`, async () => {
      const profileLink = this.page.getByRole('link', { name: authorName });
      await profileLink.first().click();
    });
  }
}