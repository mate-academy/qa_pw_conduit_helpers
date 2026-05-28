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

test('Edit the article title for the existing article', async () => {
  
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertTitleFieldHasValue(article.title);
  await editArticlePage.fillTitleField(article.title + ' Updated');
  await editArticlePage.assertTitleFieldHasValue(article.title + ' Updated');
  await editArticlePage.page.waitForTimeout(1000);
  await editArticlePage.clickUpdateArticleButton();
 
 
  await viewArticlePage.assertArticleTitleIsVisible(article.title + ' Updated');
  
});

