import { test } from '@playwright/test';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.describe('Edit article permissions tests', () => {
  test('A user cannot edit an article created by another user', async ({
    page,
  }) => {
    const viewArticlePage = new ViewArticlePage(page);

    const author = generateNewUserData();
    await signUpUser(page, author);

    const article = generateNewArticleData();
    await createNewArticle(page, article);
    const articleUrl = viewArticlePage.getArticleUrl();

    const anotherUser = generateNewUserData();
    await signUpUser(page, anotherUser);

    await page.goto(articleUrl);

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertEditArticleLinkIsNotVisible();
  });
});
