import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/auth/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { faker } from '@faker-js/faker';

let viewArticlePage;
let article;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData(1);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit the article text for the existing article', async ({ page }) => {
  const newText = faker.lorem.sentence(5);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.assertArticleTextIsVisible(article.text);

  await editArticlePage.editTextField(newText);

  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL(/\/article\//);

  await page.reload();

  await viewArticlePage.assertArticleTextIsVisible(newText);
});
