import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { test } from '@playwright/test';

export async function editArticle(page, article) {
  await test.step(`Edit article`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.waitForArticleToLoad();

    await editArticlePage.clearTitleField();
    await editArticlePage.fillTitleField(article.title);
    await editArticlePage.clearDescriptionField();
    await editArticlePage.fillDescriptionField(article.description);
    await editArticlePage.clearTextField();
    await editArticlePage.fillTextField(article.text);
    await editArticlePage.clearTags();

    for (const tag of article.tags) {
      await editArticlePage.addTag(tag);
    }

    await editArticlePage.clickUpdateArticleButton();
  });
}
