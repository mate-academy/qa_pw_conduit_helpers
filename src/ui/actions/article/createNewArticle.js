import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
export async function createNewArticle(page, article) {
  const articlePage = new CreateArticlePage(page);
  const viewArticlePage = new ViewArticlePage(page);
  await articlePage.fillTitleField(article.title);
  await articlePage.fillDescriptionField(article.description);
  await articlePage.fillTextField(article.text);

  if (article.tags.length > 0) {
    for (const tag of article.tags) {
      await articlePage.fillTagsField(tag);
    }
  }

  await articlePage.clickPublishArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
}