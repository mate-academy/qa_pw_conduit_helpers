import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { TITLE_CANNOT_BE_EMPTY, DESCRIPTION_CANNOT_BE_EMPTY, TEXT_CANNOT_BE_EMPTY } from '../../constants/articleErrorMessages';

export async function editArticleTitle(page, article) {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Edit article title', async () => {
        await viewArticlePage.clickEditArticleButton();

        await createArticlePage.clearTitleField();
        await createArticlePage.fillTitleField(article.title);
        // await createArticlePage.clearDescriptionField();
        // await createArticlePage.fillDescriptionField(article.description);
        // await createArticlePage.clearTextField();
        // await createArticlePage.fillTextField(article.text);
        // await createArticlePage.deleteTagBuble();
        // await createArticlePage.fillTagField(article.tag);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        // await viewArticlePage.assertArticleTextIsVisible(article.text);
    });
}

export async function editArticleDescription(page, article) {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Edit article description', async () => {
        await viewArticlePage.clickEditArticleButton();

        // await createArticlePage.clearTitleField();
        // await createArticlePage.fillTitleField(article.title);
        await createArticlePage.clearDescriptionField();
        await createArticlePage.fillDescriptionField(article.description);
        // await createArticlePage.clearTextField();
        // await createArticlePage.fillTextField(article.text);
        // await createArticlePage.deleteTagBuble();
        // await createArticlePage.fillTagField(article.tag);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        // await viewArticlePage.assertArticleTextIsVisible(article.text);
    });
}

export async function editArticleText(page, article) {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Edit article text', async () => {
        await viewArticlePage.clickEditArticleButton();

        // await createArticlePage.clearTitleField();
        // await createArticlePage.fillTitleField(article.title);
        // await createArticlePage.clearDescriptionField();
        // await createArticlePage.fillDescriptionField(article.description);
        await createArticlePage.clearTextField();
        await createArticlePage.fillTextField(article.text);
        // await createArticlePage.deleteTagBuble();
        // await createArticlePage.fillTagField(article.tag);
        await editArticlePage.clickUpdateArticleButton();

        // await viewArticlePage.assertArticleTitleIsVisible(article.title);
        await viewArticlePage.assertArticleTextIsVisible(article.text);
    });
}

export async function editArticleTag(page, article) {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Edit article tag', async () => {
        await viewArticlePage.clickEditArticleButton();

        // await createArticlePage.clearTitleField();
        // await createArticlePage.fillTitleField(article.title);
        // await createArticlePage.clearDescriptionField();
        // await createArticlePage.fillDescriptionField(article.description);
        // await createArticlePage.clearTextField();
        // await createArticlePage.fillTextField(article.text);
        if (Array.isArray(article.tags) && article.tags.length > 0) {
            for (const tag of article.tags) {
                if (tag) {
                    await createArticlePage.fillTagField(tag);
                }
            }
        }

        await editArticlePage.clickUpdateArticleButton();

        // await viewArticlePage.assertArticleTitleIsVisible(article.title);
        // await viewArticlePage.assertArticleTextIsVisible(article.text);
        if (Array.isArray(article.tags) && article.tags.length > 0) {
            for (const tag of article.tags) {
                if (tag) {
                    await viewArticlePage.assertTagBubleIsVisible(tag);
                }
            }
        }
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

export async function editArticleWithoutDescription(page) {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Edit article without description', async () => {
        await viewArticlePage.clickEditArticleButton();

        await createArticlePage.clearDescriptionField();
        await editArticlePage.clickUpdateArticleButton();
    });
}

export async function editArticleWithoutText(page) {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Edit article without text', async () => {
        await viewArticlePage.clickEditArticleButton();

        await createArticlePage.clearTextField();
        await editArticlePage.clickUpdateArticleButton();
    });
}

export async function removeTagInArticle(page, article) {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await test.step('Remove tag in article', async () => {
        await viewArticlePage.clickEditArticleButton();

        await createArticlePage.deleteTagBuble();
        await editArticlePage.clickUpdateArticleButton();

        for (const tag of article.tags) {
            await viewArticlePage.assertTagBubleIsNotVisible(tag);
        }
    });
}