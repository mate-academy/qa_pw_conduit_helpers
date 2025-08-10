import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ProfilePage } from '../../pages/ProfilePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function editArticle(page, article, updatedArticle, deleteTags = false) {
  await test.step(`Edit Article`, async () => {
    const homePage = new HomePage(page);
    const profilePage = new ProfilePage(page);
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await homePage.clickMyProfileLink();

    await profilePage.assertMyPostsTabIsVisible();
    await profilePage.clickArticleLink(article.title);
    await viewArticlePage.clickEditArticleButton();

    if (article.title) {
      await createArticlePage.fillTitleField(updatedArticle.title);
    }
    if (article.description) {
      await createArticlePage.fillDescriptionField(updatedArticle.description);
    }
    if (article.text) {
      await createArticlePage.fillTextField(updatedArticle.text);
    }
    if (deleteTags && article.tags && article.tags.length > 0) {
      for (const tag of article.tags) {
        await createArticlePage.removeTag(tag);
      }
    } else if (updatedArticle.tags && updatedArticle.tags.length > 0) {
      for (const tag of updatedArticle.tags) {
        await createArticlePage.fillTagField(tag);
      }
    }

    await createArticlePage.clickUpdateArticleButton();

    const isAllChanged =
      updatedArticle.title && updatedArticle.title !== article.title &&
      updatedArticle.description && updatedArticle.description !== article.description &&
      updatedArticle.text && updatedArticle.text !== article.text;

    if (isAllChanged) {
      await viewArticlePage.refreshAfterUpdate();
    }
  });
}