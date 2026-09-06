import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let article;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  article = generateNewArticleData(1);
  editArticlePage = new EditArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Remove the article Tag of an existing article', async ({ page }) => {
  const viewArticlePage = new ViewArticlePage(page);    
 
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeTag();
  await editArticlePage.assertTagIsNotVisible(article.tags[0]);
  await viewArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(article.title);

});