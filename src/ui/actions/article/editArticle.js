import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function editArticleWithTag(page, article) {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Edit article with tag', async () => {
        await viewArticlePage.clickEditArticleButton();

        await createArticlePage.clearTitleField();
        await createArticlePage.fillTitleField(article.title);
        await createArticlePage.clearDescriptionField();
        await createArticlePage.fillDescriptionField(article.description);
        await createArticlePage.clearTextField();
        await createArticlePage.fillTextField(article.text);
        await createArticlePage.deleteTagBuble();
        await createArticlePage.fillTagField(article.tag);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        await viewArticlePage.assertArticleTextIsVisible(article.text);
    });
}

export async function editArticleWithoutTag(page, article) {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Edit article without tag', async () => {
        await viewArticlePage.clickEditArticleButton();

        await createArticlePage.clearTitleField();
        await createArticlePage.fillTitleField(article.title);
        await createArticlePage.clearDescriptionField();
        await createArticlePage.fillDescriptionField(article.description);
        await createArticlePage.clearTextField();
        await createArticlePage.fillTextField(article.text);
        await createArticlePage.fillTagField(article.tag);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        await viewArticlePage.assertArticleTextIsVisible(article.text);
    });
}

export async function editArticleWithoutTitle(page) {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Edit article without title', async () => {
        await viewArticlePage.clickEditArticleButton();

        await createArticlePage.clearTitleField();
        await editArticlePage.clickUpdateArticleButton();
    });
}