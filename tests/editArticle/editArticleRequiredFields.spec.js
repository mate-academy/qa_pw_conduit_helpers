import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { 
  editArticleTitle, 
  editArticleDescription, 
  editArticleText, 
  removeArticleTitle, 
  removeArticleDescription, 
  removeArticleText 
} from '../../src/ui/actions/article/editArticle';

let homePage;
let createArticlePage;
let viewArticlePage;
let article;
let editedArticle;
let user;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(3);
  editedArticle = generateNewArticleData(3);
  user = generateNewUserData();

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
});

test(`Edit the article's title`, async ({ page }) => {
  await editArticleTitle(page, editedArticle);
});

test(`Edit the article's description`, async ({ page }) => {
  await editArticleDescription(page, article, editedArticle);
});

test(`Edit the article's text`, async ({ page }) => {
  await editArticleText(page, editedArticle);
});

test(`Remove the article's title`, async ({ page }) => {
  await removeArticleTitle(page);
});

test(`Remove the article's description`, async ({ page }) => {
  await removeArticleDescription(page);
});

test(`Remove the article's text`, async ({ page }) => {
  await removeArticleText(page);
});
