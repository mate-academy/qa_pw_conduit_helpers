import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import createNewArticle from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test('edit article negative tests', async ({ page }) => {
  const homePage = new HomePage(page);
  const viewArticlePage = new ViewArticlePage(page);
  const editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();
  await signUpUser(page, user);

  const article = generateNewArticleData();
  await createNewArticle(page, article);

  // Przejdź do edycji artykułu
  await viewArticlePage.clickEditArticleButton();

  // Usuń tytuł i spróbuj zapisać
  await editArticlePage.fillTitleField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
