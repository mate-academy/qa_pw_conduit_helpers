import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';



let homePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Create an article with required fields', async ({ page }) => {
  await homePage.clickNewArticleLink();

  await createNewArticle(page, article);
});

test('Create an article without tags', async ({ page }) => {
  await homePage.clickNewArticleLink();

  // Видаляємо теги перед викликом
  delete article.tags;

  // Викликаємо ТУ Ж САМУ функцію
  await createNewArticle(page, article);
});
