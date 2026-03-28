import { HomePage } from "../../pages/HomePage";
import { CreateArticlePage } from "../../pages/article/CreateArticlePage";
import { ViewArticlePage } from "../../pages/article/ViewArticlePage";
import { test } from "@playwright/test";

export async function createNewArticle(page, article) {
    await test.step('Create a new article', async () => {
        const homePage = new HomePage(page);
        const createArticlePage = new CreateArticlePage(page);
        const viewArticlePage = new ViewArticlePage(page);

        await homePage.clickNewArticleLink();
        await createArticlePage.fillTitleField(article.title);
        await createArticlePage.fillDescriptionField(article.description);
        await createArticlePage.fillTextField(article.text);
        await createArticlePage.fillTagField(article.tags[0]);
        await createArticlePage.clickPublishArticleButton();
        
        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        await viewArticlePage.assertArticleTextIsVisible(article.text);
    });
}