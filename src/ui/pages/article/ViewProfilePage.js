import { test, expect } from '@playwright/test';

export class ViewProfilePage {
  constructor(page) {
    this.page = page;
    this.articleDescription = 
    page.locator('p').filter({ hasText: 'Article description:' });
  }



  async assertArticleDescription(title) {
    await test.step(`Assert the article has correct description'`, async () => {
    await expect(this.articleDescription).toContainText(title);
  });
}

}