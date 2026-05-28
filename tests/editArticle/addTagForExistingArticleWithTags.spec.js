import {  expect,test } from '@playwright/test';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let article;
let viewArticlePage;
let editArticlePage;



test.beforeEach(async ({ page }) => {
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(1);
 


  const user = generateNewUserData();
  await signUpUser(page, user);
  await createNewArticle(page, user, article);
});

test('Add a tag for the existing article with tags', async () => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagField('new-tag');
    await editArticlePage.page.waitForTimeout(500);
await expect(editArticlePage.updateArticleButton).toBeEnabled();

  await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.page.waitForTimeout(1000);
      await viewArticlePage.page.reload();
      
  await viewArticlePage.clickEditArticleButton();
     await viewArticlePage.page.reload();
    await viewArticlePage.page.waitForTimeout(1000);
  await viewArticlePage.assertTagIsVisible('new-tag');
});
