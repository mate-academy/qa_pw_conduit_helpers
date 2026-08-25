import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let viewArticlePage;
let article;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);

  article = generateNewArticleData(1);
  const user = generateNewUserData();

  await signUpUser(page, user);

  await createNewArticle(page, article);

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
});

test('Remove an article text for the existing article', async ({}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeArticleTextField();
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertEmptyTextError(BODY_CANNOT_BE_EMPTY);
});
