import { test } from '@playwright/test';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import {
    BODY_CANNOT_BE_EMPTY,
    DESCRIPTION_CANNOT_BE_EMPTY,
    TITLE_CANNOT_BE_EMPTY,
} from '../../constants/articleErrorMessages';

export class CheckArticleUtil{
    static async checkArticleFields(article, page){
        await test.step(`Check article fields: ${article.title}`, async () => {
            const viewArticlePage = new ViewArticlePage(page)

            await viewArticlePage.assertArticleTextIsVisible(article.body)
            await viewArticlePage.assertArticleTitleIsVisible(article.title)
            await viewArticlePage.assertArticleTagsVisible(article.tags)
        })
    }

    static async checkErrorMessageVisible(article, page){
        await test.step('Check error messages visible', async () => {
            const viewArticlePage = new ViewArticlePage(page)

            if (article.title === null) {
                await viewArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY)
            }

            if (article.description === null) {
                await viewArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY)
            }

            if (article.body === null) {
                await viewArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY)
            }
        })
    }
}