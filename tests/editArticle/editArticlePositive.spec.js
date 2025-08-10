import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';

let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(3);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit an article fields for the existing article with tags', async ({ page }) => {
  const updatedArticle = generateNewArticleData(3);
  
  await editArticle(page, article, updatedArticle);

  const isValidUpdate =
    (!('title' in updatedArticle) || updatedArticle.title.trim() !== '') &&
    (!('description' in updatedArticle) || updatedArticle.description.trim() !== '') &&
    (!('text' in updatedArticle) || updatedArticle.text.trim() !== '');

  if (isValidUpdate) {
    const isAllChanged =
      'title' in updatedArticle && updatedArticle.title !== article.title &&
      'description' in updatedArticle && updatedArticle.description !== article.description &&
      'text' in updatedArticle && updatedArticle.text !== article.text;

    if (isAllChanged) {
      await test.step(`Refresh after update the article`, async () => {
        await page.goBack();
        await page.reload();
      });
    }
  }

  await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
  if (updatedArticle.tags && updatedArticle.tags.length > 0) {
    for (const tag of updatedArticle.tags) {
      await viewArticlePage.assertArticleTagIsVisible(tag);
    }
  }
});

test('Edit an article fields for the existing article without tags', async ({ page }) => {
  const initialArticle = generateNewArticleData(0);
  await createNewArticle(page, initialArticle);

  const newTags = [faker.lorem.word(), faker.lorem.word()];
  const updatedArticle = {
    title: initialArticle.title,
    description: initialArticle.description,
    text: initialArticle.text,
    tags: newTags,
  };

  await editArticle(page, initialArticle, updatedArticle);

  const isValidUpdate =
    (!('title' in updatedArticle) || updatedArticle.title.trim() !== '') &&
    (!('description' in updatedArticle) || updatedArticle.description.trim() !== '') &&
    (!('text' in updatedArticle) || updatedArticle.text.trim() !== '');

  if (isValidUpdate) {
    const isAllChanged =
      'title' in updatedArticle && updatedArticle.title !== article.title &&
      'description' in updatedArticle && updatedArticle.description !== article.description &&
      'text' in updatedArticle && updatedArticle.text !== article.text;

    if (isAllChanged) {
      await test.step(`Refresh after update the article`, async () => {
        await page.goBack();
        await page.reload();
      });
    }
  }

  await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
  if (updatedArticle.tags && updatedArticle.tags.length > 0) {
    for (const tag of updatedArticle.tags) {
      await viewArticlePage.assertArticleTagIsVisible(tag);
    }
  }
});

test('Remove an article tag for the existing article', async ({ page }) => {
  const updatedArticle = { 
    title: faker.lorem.words(),
    description: faker.lorem.sentence(4),
    text: faker.lorem.sentence(4),
    tags: [] 
  }; 
  
  await editArticle(page, article, updatedArticle, true);
  if (article.tags && article.tags.length > 0) {
    for (const tag of article.tags) {
      await viewArticlePage.assertArticleTagIsNotVisible(tag);
    }
  }
});