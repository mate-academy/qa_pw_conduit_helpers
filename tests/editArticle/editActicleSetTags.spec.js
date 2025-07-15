import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { updateArticle } from '../../src/ui/actions/article/updateArticle';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';

let user;
let article;

test.beforeEach(async ({ page }) => {
  user = generateNewUserData();
  article = generateNewArticleData(0);

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Update article required fields, add tags', async ({ page }) => {
  /*
    Edit the article title for the existing article
    Edit the article description for the existing article
    Edit the article text for the existing article
    Add the tag for the existing article without tags
  */

  const profilePage = new ProfilePage(page);

  article = generateNewArticleData(2);
  await updateArticle(page, article);

  await profilePage.open(user.username);
  await profilePage.assertArticleTitleContainsText(article.title);
  await profilePage.assertArticleDescriptionContainsText(article.description);
  await profilePage.assertTagsAreVisible(article.tags);
});
