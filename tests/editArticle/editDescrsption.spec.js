import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

// editDescription.spec.js
test('Edit the article description for the existing article', async ({
  page,
}) => {
  const user = generateNewUserData();
  const article = generateNewArticleData();
  const newDescription = generateNewArticleData().description;

  const viewArticlePage = new ViewArticlePage(page);
  const editArticlePage = new CreateArticlePage(page);

  await signUpUser(page, user);
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillDescriptionField(newDescription);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertDescriptionFieldHasValue(newDescription);
});
