import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { faker } from '@faker-js/faker';

let viewArticlePage;
let createArticlePage;
let article;
let newDescription;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  article = generateNewArticleData();
  newDescription = faker.lorem.sentence(4);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Delete the article description for the existing article', async () => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.fillDescriptionField('');
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleDescriptionIsNotVisible(article.description);
});