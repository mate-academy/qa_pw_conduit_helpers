import { test, expect } from '@playwright/test';
import { generateNewArticleData } from '../../../common/testData/generateNewArticleData';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';

export async function editArticle(page, editField) {
  await test.step(`Edit the article '${editField}'`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);
    const updatedArticle = generateNewArticleData();

    await viewArticlePage.clickEditArticleButton();
    // eslint-disable-next-line playwright/no-conditional-in-test
    switch (editField) {
      case 'title':
        await createArticlePage.fillTitleField(updatedArticle.title);
        break;

      case 'description':
        await createArticlePage.fillDescriptionField(
          updatedArticle.description,
        );

        break;
      case 'text':
        await createArticlePage.fillTextField(updatedArticle.text);

        break;

      default:
        throw new Error(`Unknown field: ${editField}`);
    }
    await createArticlePage.clickUpdateArticleButton();
    await expect(page).toHaveURL(/article/);
    await page.reload();

    // eslint-disable-next-line playwright/no-conditional-in-test
    switch (editField) {
      case 'title':
        await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
        break;

      case 'description':
        await viewArticlePage.clickEditArticleButton();
        await createArticlePage.assertDescriptionFieldHasValue(
          updatedArticle.description,
        );
        break;
      case 'text':
        await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
        break;
    }
  });
}
