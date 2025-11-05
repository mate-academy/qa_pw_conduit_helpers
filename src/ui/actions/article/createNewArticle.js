import { CreateArticlePage } from "../../pages/article/CreateArticlePage";
import { ViewArticlePage } from "../../pages/article/ViewArticlePage";
import { test } from "@playwright/test";

export async function createNewArticle(page, article, expectedError) {
  await test.step(`Create a new article`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    if (article.title) await createArticlePage.fillTitleField(article.title);
    if (article.description) await createArticlePage.fillDescriptionField(article.description);
    if (article.text) await createArticlePage.fillTextField(article.text);
    if (article.tags?.length > 0) {
      for (const tag of article.tags) {
        await createArticlePage.fillTagsField(tag);
      }
    }

    await createArticlePage.clickPublishArticleButton();

    if (expectedError) {
      await createArticlePage.assertErrorMessageContainsText(expectedError);
      return;
    }

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
  });
}
