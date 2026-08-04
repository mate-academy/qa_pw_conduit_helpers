import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let user;
let article;
let viewArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  user = generateNewUserData();
  article = generateNewArticleData(1);

  await signUpUser(page, user);
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
});

test('Remove article tag for article with tags', async ({ page }) => {
  const editArticlePage = new EditArticlePage(page);

  await editArticlePage.removeTag();
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagIsNotVisible(article.tags[0]);
});
