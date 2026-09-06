import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import{ faker } from '@faker-js/faker';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';

let article;
let editArticlePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  article = generateNewArticleData(1);
  editArticlePage = new EditArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Add the tag to the existing article with tags', async ({ page }) => {
  const tag = faker.lorem.words(1).split(' ');
  const viewArticlePage = new ViewArticlePage(page);    
 
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTagField(tag); 
  await editArticlePage.assertTagIsVisible(tag);
  await viewArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTagsAreVisible(tag);

});