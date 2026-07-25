import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

let homePage;
let editArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData();

  await signUpUser(page, user);
  await createNewArticle(page, article);

});

test('Edit the title of an existing article', async () => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTitleField(article.title);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});
