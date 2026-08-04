import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';

export async function editArticle(page, updatedFields = {}) {
  await test.step('Edit article fields', async () => {
    const editArticlePage = new EditArticlePage(page);

    if (updatedFields.title !== undefined) await editArticlePage.fillTitle(updatedFields.title);
    if (updatedFields.description !== undefined) await editArticlePage.fillDescription(updatedFields.description);
    if (updatedFields.text !== undefined) await editArticlePage.fillBody(updatedFields.text);
    if (updatedFields.addTag) await editArticlePage.addTag(updatedFields.addTag);
    if (updatedFields.removeTag) await editArticlePage.removeTag(updatedFields.removeTag);

    await editArticlePage.clickUpdateArticleButton();
  });
}