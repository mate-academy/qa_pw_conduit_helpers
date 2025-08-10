import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.myPostsTab = page.getByText('My Posts');
  }

  async assertMyPostsTabIsVisible() {
    await test.step(`Assert 'My Posts' tab is visible`, async () => {
      await expect(this.myPostsTab).toBeVisible();
    });
  }

  async clickArticleLink(articleTitle) {
    const articleLink = this.page.getByText(articleTitle);

    await test.step(`Click the '${articleTitle}' link`, async () => {
      await articleLink.click();
    });
  }
}