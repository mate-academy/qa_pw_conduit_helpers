import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { articleErrorMessages } from '../../src/ui/constants/articleErrorMessages';

test('Remove the article text for the existing article', async ({ page }) => {
  const user = generateNewUserData();
  const article = generateNewArticleData();

  await signUpUser(page, user);
  await createNewArticle(page, article);

  const viewArticlePage = new ViewArticlePage(page);
  const editArticlePage = new CreateArticlePage(page);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTextField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(
    articleErrorMessages.TEXT_CANNOT_BE_EMPTY,
  );
});
