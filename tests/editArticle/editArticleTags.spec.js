import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let editArticlePage;
let viewArticlePage;

test.beforeEach(async ({ page }) => {
  editArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Add the tag for the existing article without tags', async ({ page }) => {
  const article = generateNewArticleData();
  const [newTag] = generateNewArticleData(1).tags;
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.fillTagsField(newTag);
  await editArticlePage.clickPublishArticleButton();
  await viewArticlePage.waitForArticlePage();

  await viewArticlePage.assertArticleTagIsVisible(newTag);
});

test('Add the tag for the existing article with tags', async ({ page }) => {
  const article = generateNewArticleData(1);
  const [newTag] = generateNewArticleData(1).tags;
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.fillTagsField(newTag);
  await editArticlePage.clickPublishArticleButton();
  await viewArticlePage.waitForArticlePage();

  await viewArticlePage.assertArticleTagIsVisible(article.tags[0]);
  await viewArticlePage.assertArticleTagIsVisible(newTag);
});

test('Remove an article tag for the existing article with tag', async ({
  page,
}) => {
  const article = generateNewArticleData(1);
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.removeTag(article.tags[0]);
  await editArticlePage.clickPublishArticleButton();
  await viewArticlePage.waitForArticlePage();

  await viewArticlePage.assertArticleTagIsNotVisible(article.tags[0]);
});

test('Add multiple tags to an article without tags', async ({ page }) => {
  const article = generateNewArticleData();
  const { tags: newTags } = generateNewArticleData(3);
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.addTags(newTags);
  await editArticlePage.clickPublishArticleButton();
  await viewArticlePage.waitForArticlePage();

  for (const tag of newTags) {
    await viewArticlePage.assertArticleTagIsVisible(tag);
  }
});
