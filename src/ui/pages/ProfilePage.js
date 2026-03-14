import { test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.profilelink = page.getByRole('link', { name: /your profile image/i });
  }


  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickProfileLink() {
    await test.step(`Click the 'Profile' link`, async () => {
      await this.profilelink.click();
    });
  }
}
