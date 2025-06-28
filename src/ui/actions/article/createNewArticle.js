import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';

export async function createNewArticle(page, articleData, withTag = false) {
  await test.step(`Create a new article with tag = "${withTag}"`, async () => {
    const articlePage = new CreateArticlePage(page);

    await articlePage.fillTitleField(articleData.title);
    await articlePage.fillDescriptionField(articleData.description);
    await articlePage.fillBodyField(articleData.body);

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (withTag) {
      await articlePage.fillTagsField(articleData.tags);
    }
    await articlePage.clickPublishArticleButton();
  });
}
