import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { HomePage } from '../../pages/HomePage';

export async function createNewArticle(
  page,
  { title, description, text, tag = '' },
) {
  const createArticlePage = new CreateArticlePage(page);
  const homePage = new HomePage(page);

  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitleField(title);
  await createArticlePage.fillDescriptionField(description);
  await createArticlePage.fillTextField(text);

  if (tag) {
    await createArticlePage.addTag(tag);
  }
  await createArticlePage.clickPublishArticleButton();
}
