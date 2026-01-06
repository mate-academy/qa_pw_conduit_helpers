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
  article = generateNewArticleData(2);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
});

test('Replace all article tags', async ({ page }) => {
  const newTag1 = faker.lorem.word();
  const newTag2 = faker.lorem.word();
  const oldTag1 = article.tags[0];
  const oldTag2 = article.tags[1];

  await editArticle(page, {
    removeTags: [oldTag1, oldTag2],
    addTags: [newTag1, newTag2],
  });

  await expect(page.locator('.tag-default', { hasText: newTag1 })).toBeVisible();
  await expect(page.locator('.tag-default', { hasText: newTag2 })).toBeVisible();

  await expect(page.locator('.tag-default', { hasText: oldTag1 })).not.toBeVisible();
  await expect(page.locator('.tag-default', { hasText: oldTag2 })).not.toBeVisible();
});
