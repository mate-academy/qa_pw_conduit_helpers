import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let editArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  editArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit the article title for the existing article', async () => {
  const { title: newTitle } = generateNewArticleData();

  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.fillTitleField(newTitle);
  await editArticlePage.clickPublishArticleButton();
  await viewArticlePage.waitForArticlePage();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});

test('Edit the article description for the existing article', async ({
  page,
}) => {
  const { description: newDescription } = generateNewArticleData();
  const homePage = new HomePage(page);

  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.fillDescriptionField(newDescription);
  await editArticlePage.clickPublishArticleButton();
  await viewArticlePage.waitForArticlePage();

  await homePage.openHomePage();
  await homePage.clickGlobalFeedTab();
  await homePage.assertArticlePreviewDescriptionIsVisible(
    article.title,
    newDescription,
  );
});

test('Edit the article text for the existing article', async () => {
  const { text: newText } = generateNewArticleData();

  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.fillTextField(newText);
  await editArticlePage.clickPublishArticleButton();
  await viewArticlePage.waitForArticlePage();

  await viewArticlePage.assertArticleTextIsVisible(newText);
});

test('Edit the title and the text of the article simultaneously', async () => {
  const { title: newTitle, text: newText } = generateNewArticleData();

  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.fillTitleField(newTitle);
  await editArticlePage.fillTextField(newText);
  await editArticlePage.clickPublishArticleButton();
  await viewArticlePage.waitForArticlePage();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  await viewArticlePage.assertArticleTextIsVisible(newText);
});