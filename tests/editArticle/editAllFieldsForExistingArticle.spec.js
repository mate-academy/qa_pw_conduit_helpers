import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { UserProfilePage } from '../../src/ui/pages/user/UserProfilePage';

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

test('Edit all fields for the existing article without tags', async () => {
  const updatedText = faker.lorem.sentences();
  const updatedTitle = faker.lorem.word();
  const updatedDescription = faker.lorem.sentence();
  const tag = faker.lorem.word();

  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.fillTextField(updatedText);
  await createArticlePage.fillTitleField(updatedTitle);
  await createArticlePage.fillDescriptionField(updatedDescription);
  await createArticlePage.fillTagsField(tag);

  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.waitFor();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTextIsVisible(updatedText);
  await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
  await viewArticlePage.assertArticleTagListIsVisible(tag);
  await viewArticlePage.clickUserProfileButton();

  await userProfilePage.assertArticleDescriptionContainsText(
    updatedDescription,
  );
});
