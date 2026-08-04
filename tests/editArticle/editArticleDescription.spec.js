import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ProfilePage } from '../../src/ui/pages/profile/ProfilePage';

let user;
let article;
let viewArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  user = generateNewUserData();
  article = generateNewArticleData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
});

test('Edit article description for existing article', async ({ page }) => {
  const editArticlePage = new EditArticlePage(page);
  const profilePage = new ProfilePage(page);
  const description = faker.lorem.sentence(4);

  await editArticlePage.editDescriptionField(description);
  await editArticlePage.clickUpdateArticleButton();
  await profilePage.openProfilePage(user.username);
  await profilePage.assertArticleDescriptionIsVisible(description);
});
