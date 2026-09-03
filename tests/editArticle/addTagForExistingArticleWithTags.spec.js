import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { faker } from '@faker-js/faker';

let viewArticlePage;
let article;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData(2);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Add the tag for the existing article with tags', async ({ page }) => {
  const newTag = faker.lorem.word();
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.enterTagsField(newTag);

  await editArticlePage.clickUpdateArticleButton();
  await page.waitForURL(/\/article\//);

  await page.reload();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTagIsVisible(newTag);
  // BUG: тег зберігається на бекенді (підтверджено через Network → tagList у response),
  // але не відображається на сторінці статті без reload.
});
