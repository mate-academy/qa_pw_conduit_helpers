import { HomePage } from '../../pages/HomePage';
import { createNewArticle } from './createNewArticle';
import { test } from '@playwright/test';

export async function createArticleIfMissing(page) {
    await test.step("creating new article if missing", async () => {
        const homePage = new HomePage(page)

        const isArticlePresent = await homePage.isArticlePresent()

        if (!isArticlePresent) {
            await createNewArticle({}, page)
        }
    })
}