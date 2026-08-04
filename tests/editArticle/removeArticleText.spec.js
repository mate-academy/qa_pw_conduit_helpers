import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let user;
let article;
let viewArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  user = generateNewUserData();
  article = generateNewArticleData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
});

test('Remove article text for existing article', async ({ page }) => {
  const editArticlePage = new EditArticlePage(page);

  await editArticlePage.removeArticleText();
  await editArticlePage.clickUpdateArticleButtonExpectingError();
  await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
