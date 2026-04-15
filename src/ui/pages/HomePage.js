import { expect, test } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.yourFeedTab = page.getByText('Your Feed');
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.articlePreview = page.locator('.article-preview');
    }

    async clickNewArticleLink() {
        await test.step(`Click the 'New Article' link`, async () => {
            await this.newArticleLink.click();
        });
    }

    async assertYourFeedTabIsVisible() {
        await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
            await expect(this.yourFeedTab).toBeVisible();
        });
    }

    async isArticlePresent() {
        return await test.step(`Check if any article is present`, async () => {
            const count = await this.articlePreview.count();
            return count > 0;
        });
    }
}