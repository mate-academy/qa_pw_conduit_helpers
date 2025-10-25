import { HomePage } from '../../pages/HomePage';
import {CreateArticlePage} from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { test } from '@playwright/test';

//user should be logged in
export async function createNewArticle(page, article, tagsShouldBe) {
  await test.step(`Create new article`, async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);
    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (tagsShouldBe) {
      await createArticlePage.fillInTags(article.tags);
    }
    
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
  });
}
