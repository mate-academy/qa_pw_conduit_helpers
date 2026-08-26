import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.describe('Edit article', () => {
  test('Edit the article title for the existing article', async ({ page }) => {
    const user = generateNewUserData();
    const article = generateNewArticleData();
    const newTitle = generateNewArticleData().title;

    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new CreateArticlePage(page);

    await signUpUser(page, user);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillTitleField(newTitle);

    // Changing the title regenerates the article slug,
    // so the new one is taken from the update response.
    const updateResponse = page.waitForResponse(
      response =>
        response.url().includes('/api/articles') &&
        response.request().method() === 'PUT',
    );

    await editArticlePage.clickUpdateArticleButton();

    const { article: updatedArticle } = await (await updateResponse).json();
    const { origin } = new URL(page.url());

    await page.goto(`${origin}/article/${updatedArticle.slug}`);

    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });
});
