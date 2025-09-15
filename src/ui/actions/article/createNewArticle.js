import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function createNewArticle(page, article) {
    const createArticlePage = new CreateArticlePage(page);
    const homePage = new HomePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Create new article with tag', async () => {

        await homePage.clickNewArticleLink();

        await createArticlePage.fillTitleField(article.title);
        await createArticlePage.fillDescriptionField(article.description);
        await createArticlePage.fillTextField(article.text);

       if (Array.isArray(article.tags) && article.tags.length > 0) {
            for (const tag of article.tags) {
                if (tag) {
                    await createArticlePage.fillTagField(tag);
                }
            }
        }

        await createArticlePage.clickPublishArticleButton();

        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        await viewArticlePage.assertArticleTextIsVisible(article.text);
    });
}