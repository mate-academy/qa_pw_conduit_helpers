import { test, expect } from '@playwright/test';
import { TITLE_CANNOT_BE_EMPTY } from '../../constants/articleErrorMessages';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../constants/articleErrorMessages';
import { ARTICLE_BODY_CANNOT_BE_EMPTY } from '../../constants/articleErrorMessages';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.descriptionTitleProfilePage = page
      .locator('p')
      .filter({ hasText: 'Article description:' });
    this.profileButton = page
      .getByRole('link', { name: 'author profile image' })
      .first();
    this.articleTag = page.locator('ul.tag-list li');
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
  async assertArticleDescriptionIsEdit() {
    await test.step(`Assert the description has correct text`, async () => {});
    await this.profileButton.click();
    await expect(this.descriptionTitleProfilePage).toContainText(
      'New Description',
    );
  }
  async assertArticleTagIsVisible() {
    await test.step(`Assert Article Tag is Visible`, async () => {
      await expect(this.articleTag).toBeVisible();
    });
  }
  async assertArticleTagIsNotVisible() {
    await test.step(`Assert Article Tag is not Visible`, async () => {
      await expect(this.articleTag).toBeHidden();
    });
  }
}
