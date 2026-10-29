import { test, expect } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';

let viewArticlePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
});
test('Remove an article tag for the existing article with tag', async ({
  page,
}) => {
  const article = generateNewArticleData(1);
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.clickRemoveTagButton(article.tags);
  await createArticlePage.clickUpdateArticleButton();
  await expect(page).toHaveURL(/article/);
  await page.reload();

  await viewArticlePage.assertArticleTagsAreNotVisible([...article.tags]);
});
