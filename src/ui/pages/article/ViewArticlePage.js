import { expect, test } from '@playwright/test';
export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' }).first();

  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await this.page.waitForTimeout(1000);
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertDescriptionIsNotVisible() {
    await test.step(`Assert the article description is not visible'`, async () => {
      await expect(this.page.getByTestId('article-description')).toBeHidden();
    });
  }

  async assertTagIsNotVisible() {
    await test.step(`Assert the article tag is not visible'`, async () => {
      await expect(this.page.getByTestId('article-tags')).toBeHidden();
    });
  }
  
  async assertTagIsVisible(tagText) {
    await test.step(`Assert the tag '${tagText}' is visible`, async () => {
      await this.page.waitForTimeout(1000);
    
      await expect(this.page.locator('.tag-list', { hasText: tagText })).toBeVisible();
        await this.page.locator('.tag-list', { hasText: tagText }).waitFor();
    });
  }


  async waitForUpdateTitle(title){
    await test.step(`Wait for the article title to be updated'`, async () => {
      const articleTitle = this.page.getByText(title);
      await articleTitle.waitFor();
    }); 
  }

  async assertTextFieldIsNotVisible() {
    await test.step(`Assert the article text is not visible'`, async () => {
      await expect(this.page.getByTestId('article-text')).toBeHidden();
    });
  }

  async clickEditArticleButton() {
   await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }
    
}

