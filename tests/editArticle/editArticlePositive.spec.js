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

test('Edit an article fields for the existing article', async ({ page }) => {
  const updatedArticle = generateNewArticleData(1);
  
  await editArticle(page, article, updatedArticle);

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