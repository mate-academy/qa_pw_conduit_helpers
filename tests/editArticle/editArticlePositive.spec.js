import { test } from '@playwright/test';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);

  article = generateNewArticleData();

  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Edit the article title for the existing article', async ({ page }) => {
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  const newTitle = 'Updated article title';

  await createArticlePage.fillTitleField(newTitle);

  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForEditArticleButtonIsVisible();
  await viewArticlePage.reload();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});

test('Edit the article description for the existing article', 
  async ({ page }) => {
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();

  const newDescription = 'Updated article content description';

  await createArticlePage.fillDescriptionField(newDescription);

  const responsePromise = page.waitForResponse(
    response => response.url().includes('/api/articles/') 
    && response.status() === 200
  );

  await createArticlePage.clickUpdateArticleButton();

  await responsePromise;
  await createArticlePage.clickYourProfileImage(); 
  await viewArticlePage.assertArticleDescriptionIsVisible(newDescription);
});

test('Edit the article text for the existing article', async ({ page }) => {
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();

  const newText = 'Updated arcticle content text';

  await createArticlePage.fillTextField(newText);

  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForEditArticleButtonIsVisible();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTextIsVisible(newText);
});

test.describe('Edit article tags', () => {

  test('Add a tag for an existing article without tags', async ({ page }) => {
    const article = generateNewArticleData(0);
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();

    const newTag = 'qa-automation';
    await createArticlePage.fillTagsField(newTag);
    await createArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTagIsVisible(newTag);
  });

  test('Add a tag for an existing article with tags', async ({ page }) => {
    const article = generateNewArticleData(1);
    const initialTag = article.tags[0];
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();

    const additionalTag = 'playwright-test';
    await createArticlePage.fillTagsField(additionalTag);
    await createArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTagIsVisible(initialTag);
    await viewArticlePage.assertArticleTagIsVisible(additionalTag);
  });

  test('Remove an article tag for the existing article with tag', 
    async ({ page }) => {
    const article = generateNewArticleData(1);
    const existingTag = article.tags[0];
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.removeTag(existingTag);
    await createArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTagIsNotVisible(existingTag);
  });
});
