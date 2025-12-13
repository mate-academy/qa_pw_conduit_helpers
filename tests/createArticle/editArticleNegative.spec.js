import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import createNewArticle from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.describe('Edit Article Negative Tests', () => {
  let homePage;
  let viewArticlePage;
  let editArticlePage;
  let user;
  let article;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    viewArticlePage = new ViewArticlePage(page);
    editArticlePage = new EditArticlePage(page);

    user = generateNewUserData();
    await signUpUser(page, user);

    article = generateNewArticleData();
    await createNewArticle(page, article);
    await viewArticlePage.clickEditArticleButton();
  });

  test('Remove title', async () => {
    await editArticlePage.fillTitleField('');
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });

  test('Remove description', async () => {
    await editArticlePage.fillDescriptionField('');
    await editArticlePage.clickUpdateArticleButton();
    // dodaj asercję jeśli jest komunikat błędu dla opisu
  });

  test('Remove text', async () => {
    await editArticlePage.fillTextField('');
    await editArticlePage.clickUpdateArticleButton();
    // dodaj asercję jeśli jest komunikat błędu dla treści artykułu
  });
});
