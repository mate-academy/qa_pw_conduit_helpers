import { test } from "@playwright/test";
import { CreateArticlePage } from "../../src/ui/pages/article/CreateArticlePage";
import { ViewArticlePage } from "../../src/ui/pages/article/ViewArticlePage";
import { EditArticlePage } from "../../src/ui/pages/article/EditArticlePage";
import { HomePage } from "../../src/ui/pages/HomePage";
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle";

let homePage;
let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  article = generateNewArticleData(1);
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Edit text for an article', async ({ page }) => {
  const editArticlePage = new EditArticlePage(page);
  const editedArticle = generateNewArticleData(1);

  await homePage.clickNewArticleLink();

  await createNewArticle(page, article);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);

  await viewArticlePage.editArticleButtonClick();

  await editArticlePage.fillTextField(editedArticle.text); 
  await editArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.editArticleButtonClick();

  await editArticlePage.assertArticleTextIsVisible(editedArticle.text);
});