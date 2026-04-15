import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function editArticle(editData = {}, page) {
    await test.step('Edit article', async () => {
        const editArticlePage = new EditArticlePage(page)
        const viewArticlePage = new ViewArticlePage(page)

        await viewArticlePage.clickEditArticle()

        if (editData.title !== undefined) {
            await editArticlePage.fillTitleField(editData.title ?? '')
        }

        if (editData.description !== undefined) {
            await editArticlePage.fillDescriptionField(editData.description ?? '')
        }

        if (editData.body !== undefined) {
            await editArticlePage.fillTextField(editData.body ?? '')
        }

        if (editData.tags !== undefined) {
            await editArticlePage.fillTagsField(editData.tags ?? [])
        }

        await editArticlePage.clickUpdateArticleButton()
    })
}