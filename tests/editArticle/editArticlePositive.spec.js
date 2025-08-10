import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';

let homePage;
let createArticlePage;
let viewArticlePage;
let article;
let user;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(3);
  user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit an article fields for the existing article', async ({ page }) => {
  const updatedArticle = generateNewArticleData(1);
  
  await editArticle(page, article, updatedArticle);

  await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
  if (updatedArticle.tags && updatedArticle.tags.length > 0) {
    for (const tag of updatedArticle.tags) {
      await viewArticlePage.assertArticleTagIsVisible(tag);
    }
  }
});