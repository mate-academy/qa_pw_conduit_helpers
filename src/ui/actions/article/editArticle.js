import {EditArticlePage} from '../../pages/article/EditArticlePage';
import {ViewArticlePage} from '../../pages/article/ViewArticlePage';
import {test} from '@playwright/test';

export async function editArticle(page, article, options = {}) {
  const viewArticlePage = new ViewArticlePage(page);
  const {tagsToAdd = [], tagsToRemove = [], expectedError} = options;

  await test.step('Edit existing article', async () => {
    const editArticlePage = new EditArticlePage(page);

    await editArticlePage.open();
    await editArticlePage.fillTitleField(article.title);
    await editArticlePage.fillDescriptionField(article.description);
    await editArticlePage.fillTextField(article.text);
    for (const tag of tagsToAdd) {
      await editArticlePage.fillTagField(tag);
    }
    for (const tag of tagsToRemove) {
      await editArticlePage.removeTag(tag);
    }
    await editArticlePage.clickPublishArticleButton(!expectedError);

    if (expectedError) {
      await editArticlePage.assertErrorMessageContainsText(expectedError);
    } else {
      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
    }
  });
}


