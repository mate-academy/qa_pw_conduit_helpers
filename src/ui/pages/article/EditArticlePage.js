import { expect, test } from '@playwright/test';
import { CreateArticlePage } from './CreateArticlePage';

export class EditArticlePage extends CreateArticlePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
    }

    async clickUpdateArticleButton() {
        await test.step(`Click the 'Update Article' button`, async () => {
            await this.updateArticleButton.click();
        });
    }
}