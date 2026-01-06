import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { faker } from '@faker-js/faker';

let homePage;
let viewArticlePage;
let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData(1);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
});

test('Edit all article fields at once', async ({ page }) => {
  const newTitle = faker.lorem.words();
  const newDescription = faker.lorem.sentence(4);
  const newText = faker.lorem.sentences(2);
  const newTag = faker.lorem.word();

  await editArticle(page, {
    title: newTitle,
    description: newDescription,
    text: newText,
    addTags: [newTag],
  });

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  await viewArticlePage.assertArticleTextIsVisible(newText);
});
