import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let article;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  article = generateNewArticleData(1);
  editArticlePage = new EditArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Remove the article title of an existing article', async ({ page }) => {
  const viewArticlePage = new ViewArticlePage(page);    
 
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.titleField.clear(); 
  await viewArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(
    TITLE_CANNOT_BE_EMPTY,
  );
  
});