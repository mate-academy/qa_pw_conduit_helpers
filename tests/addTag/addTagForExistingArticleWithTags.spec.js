import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

let homePage;
let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Add the tag for the existing article with tags', async ({ page }) => {
  const article = generateNewArticleData(1);
  const newTag = faker.lorem.word();

  await homePage.clickNewArticleLink();

  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.addTag(newTag);

  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTagIsVisible(newTag);
});
