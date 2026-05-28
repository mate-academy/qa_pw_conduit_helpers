import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import {
  TITLE_CANNOT_BE_EMPTY
} from '../../src/ui/constants/articleErrorMessages';

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

test('Remove the article `title` for the existing article', async () => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTitleField('');

  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(
      TITLE_CANNOT_BE_EMPTY,
    );
  
});