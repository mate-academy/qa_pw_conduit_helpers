import { CreateArticlePage } from '../../../pages/article/CreateArticlePage';

export async function createNewArticle(page, article) {
  const createArticlePage = new CreateArticlePage(page);

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);

  if (article.tags?.length) {
    await createArticlePage.fillTagsField(article.tags);
  }

  await createArticlePage.clickPublishArticleButton();
}
