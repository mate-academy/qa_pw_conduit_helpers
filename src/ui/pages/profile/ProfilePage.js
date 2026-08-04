import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  async openProfilePage(username) {
    await test.step(`Open profile page`, async () => {
      await this.page.goto(`/profile/${username}`);
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(
      `Assert the article description '${description}' is visible`,
      async () => {
        await expect(
          this.page.getByText(`Article description: ${description}`),
        ).toBeVisible();
      },
    );
  }
}
