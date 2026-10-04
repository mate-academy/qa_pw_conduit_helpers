import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import {
  generateNewArticleData,
  generateArticleTag,
} from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Add the tag for the existing article without tags', async ({ page }) => {
  const article = generateNewArticleData();
  const updatedArticle = { ...article, tags: [generateArticleTag()] };

  await createNewArticle(page, article);
  await editArticle(page, updatedArticle);
  await viewArticlePage.reload();

  await viewArticlePage.assertTagsAreVisible(updatedArticle.tags);
});

test('Add the tag for the existing article with tags', async ({ page }) => {
  const article = generateNewArticleData(2);
  const updatedArticle = {
    ...article,
    tags: [...article.tags, generateArticleTag()],
  };

  await createNewArticle(page, article);
  await editArticle(page, updatedArticle);
  await viewArticlePage.reload();

  await viewArticlePage.assertTagsAreVisible(updatedArticle.tags);
});

test('Remove an article tag for the existing article with tag', async ({
  page,
}) => {
  const article = generateNewArticleData(1);

  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeTag(article.tags[0]);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.reload();

  await viewArticlePage.assertArticleHasNoTags();
});

test('Remove all tags for the existing article with several tags', async ({
  page,
}) => {
  const article = generateNewArticleData(3);

  await createNewArticle(page, article);
  await editArticle(page, { ...article, tags: [] });
  await viewArticlePage.reload();

  await viewArticlePage.assertArticleHasNoTags();
});
