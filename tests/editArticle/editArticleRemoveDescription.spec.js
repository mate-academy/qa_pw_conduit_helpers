import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { updateArticle } from '../../src/ui/actions/article/updateArticle';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let user;
let article;

test.beforeEach(async ({ page }) => {
  user = generateNewUserData();
  article = generateNewArticleData(5);

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Update article required fields, remove description', async ({ page }) => {
  /*
    Edit the article title for the existing article
    Edit the article description for the existing article
    Edit the article text for the existing article
    Remove an article descriptio for the existing article
  */

  const createArticlePage = new CreateArticlePage(page);

  article = generateNewArticleData(0, 'description');
  await updateArticle(page, article);

  await createArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});
