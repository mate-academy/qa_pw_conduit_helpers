import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { 
  TITLE_CANNOT_BE_EMPTY, 
  DESCTIPTION_CANNOT_BE_EMPTY, 
  TEXT_CANNOT_BE_EMPTY 
} from '../../src/ui/constants/articleErrorMessages';

let homePage;
let createArticlePage;
let article;
let user;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  user = generateNewUserData();
  article = generateNewArticleData(3);

  await signUpUser(page, user);
});

test('Create an article without title', async ({ page }) => {
  await homePage.clickNewArticleLink();

  const articleWithoutTitle = {
    description: article.description,
    text: article.text,
    tags: article.tags,
  };

  await createNewArticle(page, articleWithoutTitle, TITLE_CANNOT_BE_EMPTY);
});

test('Create an article without description', async ({ page }) => {
  await homePage.clickNewArticleLink();

  const articleWithoutDescription = {
    title: article.title,
    text: article.text,
    tags: article.tags,
  };

  await createNewArticle(page, articleWithoutDescription, DESCTIPTION_CANNOT_BE_EMPTY);
});

test('Create an article without text', async ({ page }) => {
  await homePage.clickNewArticleLink();

  const articleWithoutText = {
    title: article.title,
    description: article.description,
    tags: article.tags,
  };

  await createNewArticle(page, articleWithoutText, TEXT_CANNOT_BE_EMPTY);
});

test('Create an article without tags', async ({ page }) => {
  await homePage.clickNewArticleLink();

  const articleWithoutTags = {
    title: article.title,
    description: article.description,
    text: article.text,
  };

  await createNewArticle(page, articleWithoutTags);
});
