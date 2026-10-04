import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
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
  article = generateNewArticleData(1);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit all the fields for the existing article', async ({ page }) => {
  const updatedArticle = generateNewArticleData(2);

  await editArticle(page, updatedArticle);
  await viewArticlePage.reload();

  await viewArticlePage.assertArticleIsVisible(updatedArticle);
  await viewArticlePage.assertTagsAreVisible(updatedArticle.tags);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.assertDescriptionFieldHasValue(
    updatedArticle.description,
  );
});

test('Save the existing article without changes', async ({ page }) => {
  await editArticle(page, article);
  await viewArticlePage.reload();

  await viewArticlePage.assertArticleIsVisible(article);
  await viewArticlePage.assertTagsAreVisible(article.tags);
});
