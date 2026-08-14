import { test } from '@playwright/test';

export class HeaderPage {
  constructor(page) {
    this.page = page;
    this.profileLink = page.getByRole('link', { name: 'your profile image' });
  }


  async clickProfileLink() {
    await test.step(`Click 'Profile Link' button`, async () => {
    await this.profileLink.click();
    });
}
}