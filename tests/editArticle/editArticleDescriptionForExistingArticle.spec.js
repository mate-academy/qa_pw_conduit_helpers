import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import{ faker } from '@faker-js/faker';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';

let articleDesc;
let editArticlePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  articleDesc = generateNewArticleData();
  editArticlePage = new EditArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, articleDesc);
});

test('Edit the Description of an existing article', async ({ page }) => {
  const newDescription = faker.lorem.words(3);
  const viewArticlePage = new ViewArticlePage(page);    
 
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillDescriptionField(newDescription); 
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(articleDesc.title);
});