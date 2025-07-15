import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('a.preview-link h1');
    this.articleDescription = page.locator('a.preview-link p');
    this.articleTags = page.locator('ul.tag-list > li');
  }

  async open(username) {
    await test.step(`Open 'Profile' page for user: ${username}`, async () => {
      await this.page.goto(`/profile/${username.toLowerCase()}`);
    });
  }

  async assertArticleTitleContainsText(title) {
    await test.step(`Article 'Title' is shown`, async () => {
      await expect(this.articleTitle).toContainText(title);
    });
  }

  async assertArticleDescriptionContainsText(description) {
    await test.step(`Article 'Description' is shown`, async () => {
      await expect(this.articleDescription).toContainText(description);
    });
  }

  async assertTagsAreVisible(expectedTags) {
    const tagsLocator = this.articleTags;
    if (expectedTags.length === 0) {
      await test.step('Tags are not visible', async () => {
        await expect(tagsLocator).toHaveCount(0);
      });
      return;
    }

    await test.step('All tags are visible', async () => {
      const tagsCount = await tagsLocator.count();
      const actualTags = [];

      for (let i = 0; i < tagsCount; i++) {
        const tagText = await tagsLocator.nth(i).textContent();
        actualTags.push(tagText.trim());
      }

      for (const expectedTag of expectedTags) {
        expect(actualTags).toContain(expectedTag);
      }
    });
  }
}
