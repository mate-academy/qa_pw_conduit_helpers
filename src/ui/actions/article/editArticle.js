import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { test } from '@playwright/test';

export async function editArticle(page, updates) {
  await test.step(`Edit article`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    await viewArticlePage.clickEditArticleLink();

    if (updates.title !== undefined) {
      if (updates.title === '') {
        await editArticlePage.clearTitleField();
      } else {
        await editArticlePage.fillTitleField(updates.title);
      }
    }

    if (updates.description !== undefined) {
      if (updates.description === '') {
        await editArticlePage.clearDescriptionField();
      } else {
        await editArticlePage.fillDescriptionField(updates.description);
      }
    }

    if (updates.text !== undefined) {
      if (updates.text === '') {
        await editArticlePage.clearTextField();
      } else {
        await editArticlePage.fillTextField(updates.text);
      }
    }

    if (updates.addTags && updates.addTags.length > 0) {
      await editArticlePage.fillTagsField(updates.addTags);
    }

    if (updates.removeTags && updates.removeTags.length > 0) {
      for (const tag of updates.removeTags) {
        await editArticlePage.removeTag(tag);
      }
    }

    await editArticlePage.clickUpdateArticleButton();

    const hasValidationError =
      updates.title === '' || updates.description === '' || updates.text === '';
    if (!hasValidationError) {
      const slug = page.url().split('/').pop();
      await page.goto(`/article/${slug}`);
    }
  });
}
