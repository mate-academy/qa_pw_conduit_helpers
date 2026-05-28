import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';


let article;
let viewArticlePage;
let editArticlePage;



test.beforeEach(async ({ page }) => {
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(0);
  


  const user = generateNewUserData();
  await signUpUser(page, user);
  await createNewArticle(page, user, article);
});

test('Add a tag for the existing article without tags', async () => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagField('new-tag');
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.page.waitForTimeout(1000);
  await viewArticlePage.page.reload();
  await viewArticlePage.assertTagIsVisible('new-tag');
});

