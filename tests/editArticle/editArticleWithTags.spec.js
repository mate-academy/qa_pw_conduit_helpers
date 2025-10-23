import test from "@playwright/test";
import { HomePage } from "../../src/ui/pages/HomePage";
import { CreateArticlePage } from "../../src/ui/pages/article/CreateArticlePage";
import { ViewArticlePage } from "../../src/ui/pages/article/ViewArticlePage";
import { signUpUser } from "../../src/ui/actions/auth/signUpUser";
import { generateNewUserData } from "../../src/common/testData/generateNewUserData";
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData";
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle";
import { BODY_TEXT_CANNOT_BE_EMPTY, DESCRIPTION_CANNOT_BE_EMPTY, TITLE_CANNOT_BE_EMPTY } from "../../src/ui/constants/articleErrorMessages";

let homePage;
/** @type {CreateArticlePage} */
let createArticlePage;
/** @type {ViewArticlePage} */
let viewArticlePage;
let article;
let newArticle;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData(3);
  newArticle = generateNewArticleData(2);

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
});

test('Edit the article title for the existing article', async () => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.fillTitleField(newArticle.title);
  await createArticlePage.assertTitleInputContainsText(newArticle.title);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertTitleInputContainsText(newArticle.title);
});

test('Edit the article description for the existing article', async () => {
  await viewArticlePage.clickEditArticle();

  await createArticlePage.fillDescriptionField(newArticle.description);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertDescriptionInputContainsText(newArticle.description);
});

test('Edit the article text for the existing article', async () => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.fillTextField(newArticle.text);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertTextInputContainsText(newArticle.text);
});

test('Add the tag for the existing article with tags', async () => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.addArticleTags(newArticle.tags);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertTagsListContainsTags(newArticle.tags);
});

test('Remove an article tag for the existing article with tag', async () => {
  await viewArticlePage.clickEditArticle();

  await createArticlePage.removeFirstTag();
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.clickEditArticle();
  await createArticlePage.assertTagsListCount(article.tags.length - 1);
});

test('Remove an article title for the existing article', async () => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.fillTitleField('');
  await createArticlePage.assertTitleInputContainsText('');
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', async () => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.fillDescriptionField('');
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Remove the article text for the existing article', async () => {
  await viewArticlePage.clickEditArticle();
  
  await createArticlePage.fillTextField('');
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(BODY_TEXT_CANNOT_BE_EMPTY);
});