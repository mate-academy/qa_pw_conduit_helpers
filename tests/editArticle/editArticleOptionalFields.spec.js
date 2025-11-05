import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticleTags, removeArticleTags } from '../../src/ui/actions/article/editArticle';

let homePage;
let createArticlePage;
let viewArticlePage;
let article;
let articleNoTags;
let editedArticle;
let user;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(1);
  articleNoTags = generateNewArticleData(0);
  editedArticle = generateNewArticleData(1);
  user = generateNewUserData();

  await signUpUser(page, user);
});

test(`Edit the article's tag where no tags`, async ({ page }) => {
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleNoTags);

  await viewArticlePage.clickEditArticleButton();

  await editArticleTags(page, editedArticle);
});

test(`Edit the article's tag`, async ({ page }) => {
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();
  await editArticleTags(page, editedArticle);
});

test(`Remove the article's tag`, async ({ page }) => {
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();
  await removeArticleTags(page, article);
});
