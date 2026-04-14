import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../../common/testData/generateNewArticleData';
import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

export async function createNewArticle(page, tags) {
  await test.step('Create new Article', async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    const article = generateNewArticleData();

    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (tags) {
      await createArticlePage.fillTagsField(article.tags);
    }
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
  });
}
