import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { HomePage } from '../../pages/HomePage';

export async function createNewArticle(page, article) {
  const homePage = new HomePage(page);
  const createArticlePage = new CreateArticlePage(page);
  const viewArticlePage = new ViewArticlePage(page);

  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);

  if (Array.isArray(article.tags) && article.tags.length > 0) {
    await createArticlePage.fillTagsField(article.tags);
  }
  
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
}
