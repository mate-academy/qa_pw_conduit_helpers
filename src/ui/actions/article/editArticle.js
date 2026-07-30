import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';

/**
 * @param {import('@playwright/test').Page} page
 * @param {Object} articleData
 */
export async function editArticle(page, articleData) {
  await test.step(`Edit article with new data`, async () => {
    const editArticlePage = new EditArticlePage(page);

    if (articleData.title !== undefined) {
      await editArticlePage.fillTitleField(articleData.title);
    }

    if (articleData.description !== undefined) {
      if (articleData.description === '') {
        await editArticlePage.clearDescriptionField();
      } else {
        await editArticlePage.fillDescriptionField(articleData.description);
      }
    }

    if (articleData.body !== undefined) {
      if (articleData.body === '') {
        await editArticlePage.clearBodyField();
      } else {
        await editArticlePage.fillBodyield(articleData.body);
      }
    }

    if (articleData.tag) {
      await editArticlePage.fillTag(articleData.tag);
    }

    await editArticlePage.clickUpdateArticleButton();
  });
}
