import { test } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { DESC_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();
  const article = generateNewArticleData(5);

  await signUpUser(page, user);
  await createNewArticle(page, article);

  await viewArticlePage.clickEditButton();
});

test('Remove an article description for the existing article', async () => {
  await editArticlePage.deleteFieldText(editArticlePage.descriptionField);
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(DESC_CANNOT_BE_EMPTY);
});
