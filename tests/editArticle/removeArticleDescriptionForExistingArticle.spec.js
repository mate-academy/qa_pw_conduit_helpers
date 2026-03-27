import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let viewArticlePage;
let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(2);
  const user = generateNewUserData();
  editArticlePage = new EditArticlePage(page);

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Remove an article description for existing article', async () => {
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.clearArticleDescription();
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage
    .assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});
