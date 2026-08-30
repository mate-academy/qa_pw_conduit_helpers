import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed', { exact: true });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.yourProfile = page.getByRole('img', {name: 'your profile image'});
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickOnYourProfileLink() {
    await test.step('Click on the your profile link', async() => {
      await this.yourProfile.click()
    })
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }
}
