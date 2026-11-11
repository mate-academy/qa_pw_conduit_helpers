import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { UserProfilePage } from '../../src/ui/pages/user/UserProfilePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let createArticlePage;
let viewArticlePage;
let userProfilePage;
let article;

test.beforeEach(async ({ page }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  userProfilePage = new UserProfilePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit the article description for the existing article', async () => {
  const updatedDescription = faker.lorem.sentence();

  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillDescriptionField(updatedDescription);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.waitFor();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  await viewArticlePage.clickUserProfileButton();

  await userProfilePage.assertArticleDescriptionContainsText(
    updatedDescription,
  );
});
