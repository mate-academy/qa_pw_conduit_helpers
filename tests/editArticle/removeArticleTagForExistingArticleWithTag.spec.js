import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let viewArticlePage;
let article;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData(1);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Remove an article tag for the existing article with tag', async ({
  page,
}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertTagIsVisible(article.tag);
  await editArticlePage.removeTag(article.tag);

  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL(/\/article\//);

  await page.reload();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTagIsRemoved(article.tag);
});
