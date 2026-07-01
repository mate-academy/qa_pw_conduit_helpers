import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';

let homePage;
let viewArticlePage;
let editArticlePage;
let profilePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  profilePage = new ProfilePage(page);

  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Edit the article title for the existing article', async ({ page }) => {
  const article = generateNewArticleData();
  const newTitle = faker.lorem.words();

  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTitleField(newTitle);

  await page.waitForTimeout(2000); // workaround for the issue with the button not being clickable

  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});

test('Edit the article description for the existing article', async ({
  page,
}) => {
  const article = generateNewArticleData();
  const newDescription = 'Updated description';

  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillDescriptionField(newDescription);
  await editArticlePage.clickUpdateArticleButton();
  await homePage.clickProfileLink();

  await profilePage.assertArticleDescriptionIsVisible(newDescription);
});

test('Edit the article text for the existing article', async ({ page }) => {
  const article = generateNewArticleData();
  const newText = 'Updated text';

  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTextField(newText);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTextIsVisible(newText);
});
