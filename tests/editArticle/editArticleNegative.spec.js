import { test } from '@playwright/test';
import { UpdateArticlePage } from '../../src/ui/pages/article/UpdateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle }from '../../src/ui/actions/article/createNewArticle';
import {
  TITLE_CANNOT_BE_BLANK,
  DESCRIPTION_CANNOT_BE_BLANK,
  BODY_CANNOT_BE_BLANK
} from '../../src/ui/constants/articleErrorMessages';

let updateArticlePage;
let viewArticlePage;
let article; 

test.beforeEach(async ({ page }) => {
  updateArticlePage = new UpdateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test(
  'Remove an article title for the existing article', 
  async ({page}) => {
  await createNewArticle(page, article, true);
  await viewArticlePage.clickEditArticleButton();
  await updateArticlePage.fillTitleField('');
  await updateArticlePage.clickUpdateArticleButton();

  await updateArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_BLANK);
});

test(
  'Remove an article description for the existing article', 
  async ({page}) => {
  await createNewArticle(page, article, true);
  await viewArticlePage.clickEditArticleButton();
  await updateArticlePage.fillDescriptionField('');
  await updateArticlePage.clickUpdateArticleButton();

  await updateArticlePage
    .assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_BLANK);

});

test(
  'Remove the article text for the existing article', 
  async ({page}) => {
  await createNewArticle(page, article, true);
  await viewArticlePage.clickEditArticleButton();
  await updateArticlePage.fillTextField('');
  await updateArticlePage.clickUpdateArticleButton();

  await updateArticlePage
  .assertErrorMessageContainsText(BODY_CANNOT_BE_BLANK);
});

test(
  'Remove an article tag for the existing article with tag', 
  async ({page}) => {
  await createNewArticle(page, article, true);
  await viewArticlePage.clickEditArticleButton();
  await updateArticlePage.deleteTags(article.tags[0]);
  await updateArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  await viewArticlePage.assertCorrectTagsIsNotVisible(article.tags[0]);
});
