import test from "@playwright/test";
import { HomePage } from "../../src/ui/pages/HomePage";
import { CreateArticlePage } from "../../src/ui/pages/article/CreateArticlePage";
import { ViewArticlePage } from "../../src/ui/pages/article/ViewArticlePage";
import { signUpUser } from "../../src/ui/actions/auth/signUpUser";
import { generateNewUserData } from "../../src/common/testData/generateNewUserData";
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData";
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle";

let homePage;
/** @type {CreateArticlePage} */
let createArticlePage;
/** @type {ViewArticlePage} */
let viewArticlePage;
let newArticle;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();
  const article = generateNewArticleData();
  newArticle = generateNewArticleData(2);

  await signUpUser(page, user);
  homePage.clickNewArticleLink();
  await createNewArticle(page, article);
});
test('Add the tag for the existing article without tags', async () => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.addArticleTags(newArticle.tags);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertTagsListContainsTags(newArticle.tags);
});