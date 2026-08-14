import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { removeArticleTagForExistingArticle, 
  removeArticleTitleForExistingArticle, 
  removeArticleDescForExistingArticle,
  removeArticleBodyForExistingArticle
} from '../../src/ui/actions/article/editArticle';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESC_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY
} from '../../src/ui/constants/articleErrorMessages';


let article;

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  article = generateNewArticleData(3);

  await signUpUser(page, user);
  await createNewArticle(page, article);
});


test.describe('Remove fields', () => {
test('Remove an article tag for the existing article with tag', 
  async ({ page }) => {
 await removeArticleTagForExistingArticle(page, article);
});

test('Remove an article title for the existing article', 
  async ({ page }) => {
 await removeArticleTitleForExistingArticle(page, TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', 
  async ({ page }) => {
 await removeArticleDescForExistingArticle(page, DESC_CANNOT_BE_EMPTY);
});

test('Remove the article body for the existing article', 
  async ({ page }) => {
 await removeArticleBodyForExistingArticle(page, BODY_CANNOT_BE_EMPTY);
});
});