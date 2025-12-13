import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import createNewArticle from '../../src/ui/article/createNewArticle';

test('creates an article with required fields', async ({ page }) => {
  const homePage = new HomePage(page);
  const viewArticlePage = new ViewArticlePage(page);

  const user = generateNewUserData();
  await signUpUser(page, user);

  const article = generateNewArticleData();

  const createdArticle = await createNewArticle(page, {
    title: article.title,
    description: article.description,
    text: article.text,
    tags: article.tags || [],
  });

  await viewArticlePage.assertArticleTitleIsVisible(createdArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(createdArticle.text);
});
