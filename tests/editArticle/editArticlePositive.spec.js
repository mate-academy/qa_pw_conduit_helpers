import { test } from '@playwright/test';
import { UpdateArticlePage } from '../../src/ui/pages/article/UpdateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle }from '../../src/ui/actions/article/createNewArticle';

let updateArticlePage;
let viewArticlePage;
let article; 
let articleEdit; 

test.beforeEach(async ({ page }) => {
  updateArticlePage = new UpdateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData();
  articleEdit = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Edit the article title for the existing article', async ({page}) => {
  await createNewArticle(page, article, true);
  await viewArticlePage.clickEditArticleButton();
  await updateArticlePage.fillTitleField(articleEdit.title);
  await updateArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.assertArticleTitleIsVisible(articleEdit.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});

test(
  'Edit the article description for the existing article', 
  async ({page}) => {
  await createNewArticle(page, article, true);
  await viewArticlePage.clickEditArticleButton();
  await updateArticlePage.fillDescriptionField(articleEdit.description);
  await updateArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage
  .assertArticleDescriptionIsVisible(articleEdit.description);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});

test('Edit the article text for the existing article', async ({page}) => {
  await createNewArticle(page, article, true);
  await viewArticlePage.clickEditArticleButton();
  await updateArticlePage.fillTextField(articleEdit.text);
  await updateArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(articleEdit.text);
});

test('Add the tag for the existing article with tags', async ({page}) => {
  await createNewArticle(page, article, true);
  await viewArticlePage.clickEditArticleButton();
  await updateArticlePage.fillInTags(articleEdit.tags);
  await updateArticlePage.clickUpdateArticleButton();
  
  const generaltags =  [...article.tags, ...articleEdit.tags];
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  await viewArticlePage.assertCorrectTagsAreVisible(generaltags);
});

test('Add the tag for the existing article without tags', async ({page}) => {
  await createNewArticle(page, article, false);
  await viewArticlePage.clickEditArticleButton();
  await updateArticlePage.fillInTags(articleEdit.tags);
  await updateArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  await viewArticlePage.assertCorrectTagsAreVisible(articleEdit.tags);
});