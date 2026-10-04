import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import {
  generateNewArticleData,
  generateArticleDescription,
} from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let viewArticlePage;
let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit the article description for the existing article', async ({
  page,
}) => {
  const updatedArticle = {
    ...article,
    description: generateArticleDescription(),
  };

  await editArticle(page, updatedArticle);
  await viewArticlePage.reload();
  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.assertDescriptionFieldHasValue(
    updatedArticle.description,
  );
});
