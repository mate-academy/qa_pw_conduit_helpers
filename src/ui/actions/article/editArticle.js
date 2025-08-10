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

    if ('title' in updatedArticle) {
      await createArticlePage.fillTitleField(updatedArticle.title || '');
    }
    if ('description' in updatedArticle) {
      await createArticlePage.fillDescriptionField(updatedArticle.description || '');
    }
    if ('text' in updatedArticle) {
      await createArticlePage.fillTextField(updatedArticle.text || '');
    }

    if (deleteTags && article.tags?.length > 0) {
      for (const tag of article.tags) {
        await createArticlePage.removeTag(tag);
      }
    }

    if ('tags' in updatedArticle && updatedArticle.tags?.length > 0) {
      for (const tag of updatedArticle.tags) {
        await createArticlePage.fillTagField(tag);
      }
    }

    await createArticlePage.clickUpdateArticleButton();
  });
}