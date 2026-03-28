import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { faker } from '@faker-js/faker';

let viewArticlePage;
let createArticlePage;
let article;
let newTag;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  article = generateNewArticleData(1); 
  newTag = faker.lorem.word();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Add the tag for the existing article with tags', async () => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.fillTagsField([...article.tags, newTag]);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagIsVisible(newTag);
});