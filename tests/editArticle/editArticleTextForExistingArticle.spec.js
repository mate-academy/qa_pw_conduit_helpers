import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';


let article;
let viewArticlePage;
let editArticlePage;



test.beforeEach(async ({ page }) => {
  
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData();
 


  const user = generateNewUserData();
  await signUpUser(page, user);
  await createNewArticle(page, user, article);
});

test('Edit the article text for the existing article', async () => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTextField(article.text + ' Updated');
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsVisible(article.text + ' Updated');
  
});