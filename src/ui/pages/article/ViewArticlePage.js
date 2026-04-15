import { test, expect } from '@playwright/test';

export class ViewArticlePage {
    constructor(page) {
        this.page = page;
        this.articleTitleHeader = page.getByRole('heading');
        this.articleTags = page.locator('.tag-list li');
        this.editButton = page.getByRole('link', { name: 'Edit Article', exact: false }).first();
        this.errorMessage = page.locator('.error-messages ul').first().getByRole('listitem').first()
        this.deleteArticleButton = page.getByRole('button', { name: 'Delete Article' });
    }

    async clickEditArticle() {
        await this.editButton.click()
    }

    async deleteArticleButton() {
        await this.deleteArticleButton.click()
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

    async assertArticleTagsVisible(tags) {
        await test.step(`Assert the articles tags are visible'`, async () => {
            await expect(this.articleTags).toContainText(tags);
        })
    }

    async assertErrorMessageContainsText(messageText) {
        await test.step(`Assert the '${messageText}' error is shown`, async () => {
            await expect(this.errorMessage).toContainText(messageText);
        });
    }
}
