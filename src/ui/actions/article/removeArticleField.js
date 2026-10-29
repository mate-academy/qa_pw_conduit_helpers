import { test } from '@playwright/test';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { TITLE_CANNOT_BE_EMPTY } from '../../../ui/constants/articleErrorMessages';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../../ui/constants/articleErrorMessages';
import { TEXT_CANNOT_BE_EMPTY } from '../../../ui/constants/articleErrorMessages';

export async function removeArticleField(page, removeField) {
  await test.step(`Remove the article '${removeField}'`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    // eslint-disable-next-line playwright/no-conditional-in-test
    switch (removeField) {
      case 'title':
        await createArticlePage.fillEmptyData(removeField);
        break;

      case 'description':
        await createArticlePage.fillEmptyData(removeField);

        break;
      case 'text':
        await createArticlePage.fillEmptyData(removeField);

        break;

      default:
        throw new Error(`Unknown field: ${removeField}`);
    }
    await createArticlePage.clickUpdateArticleButton();

    // eslint-disable-next-line playwright/no-conditional-in-test
    switch (removeField) {
      case 'title':
        await createArticlePage.assertErrorMessageContainsText(
          TITLE_CANNOT_BE_EMPTY,
        );
        break;

      case 'description':
        await createArticlePage.assertErrorMessageContainsText(
          DESCRIPTION_CANNOT_BE_EMPTY,
        );
        break;
      case 'text':
        await createArticlePage.assertErrorMessageContainsText(
          TEXT_CANNOT_BE_EMPTY,
        );
    }
  });
}
