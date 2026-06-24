import { HomePage } from "../../pages/HomePage";
import { CreateArticlePage } from "../../pages/article/CreateArticlePage";
import { test } from "@playwright/test";

export async function createNewArticle(page, article) {
  await test.step(`Create new article`, async () => {
    const homePage = new HomePage(page);
    const createNewArticlePage = new CreateArticlePage(page);

    await homePage.clickNewArticleLink();

    await createNewArticlePage.fillTitleField(article.title);
    await createNewArticlePage.fillDescriptionField(article.description);
    await createNewArticlePage.fillTextField(article.text);

    if (article.tags?.length > 0) {
      for (const tag of article.tags) {
        await createNewArticlePage.fillTagsField(tag);
      }
    }

    await createNewArticlePage.clickPublishArticleButton();
  });
}
