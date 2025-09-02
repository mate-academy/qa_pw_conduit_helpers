import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

let article;
let viewArticlePage;
let editArticlePage;
let responseBody;

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  await signUpUser(page, user);
  article = generateNewArticleData(1);

  const [response] = await Promise.all([
    page.waitForResponse(
      res =>
        res.url().includes('/articles') && res.request().method() === 'POST',
    ),
    createNewArticle(page, article),
  ]);
  responseBody = await response.json();

  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
});

test('Edit the article title for the existing article', async () => {
  const newTitle = 'Changed title';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleTitle(newTitle);
  await viewArticlePage.waitForURLAndRefreshPage();
  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});

test('Edit the article description for the existing article', async () => {
  const newDesc = 'Changed description';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleDescription(newDesc);
  await viewArticlePage.clickEditArticle();
  await editArticlePage.assertArticleDescriptionContainsNewDesc(newDesc);
});

test('Edit the article text for the existing article', async () => {
  const newText = 'Changed text';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleText(newText);
  await viewArticlePage.clickEditArticle();
  await editArticlePage.assertArticleTextContainsNewText(newText);
});

test('Add the tag for the existing article without tags', async () => {
  const newTag = 'New tag';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.addArticleTag(newTag);
  await editArticlePage.assertNewArticleTagVisible();
});

test('Add the tag for the existing article with tags', async () => {
  const newTag = 'New tag';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.addArticleTag(newTag);
  await editArticlePage.assertNewArticleTagVisible();
});

test('Remove article tag for existing article with tag', async () => {
  const existingTag = responseBody.article.tagList[0];

  await viewArticlePage.clickEditArticle();
  await editArticlePage.removeArticleTag(existingTag);

  await viewArticlePage.clickEditArticle();
  await editArticlePage.assertArticleTagNotVisible(existingTag);
});

test('Remove the article title for the existing article', async () => {
  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleTitle('');
  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove the article desc for the existing article', async () => {
  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleDescription('');
  await editArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});

test('Remove the article body for the existing article', async () => {
  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleText('');
  await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
