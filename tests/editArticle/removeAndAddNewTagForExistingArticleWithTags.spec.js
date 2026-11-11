import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(1);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

// eslint-disable-next-line max-len
test('Remove the existing tag and add a new tag for the existing article with tags', async () => {
  const tag = faker.lorem.word();

  await viewArticlePage.clickEditArticleButton();

  await createArticlePage.clickDeleteTagIcon();
  await createArticlePage.fillTagsField(tag);
  await createArticlePage.clickUpdateArticleButton();

  await viewArticlePage.waitFor();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTagIsHidden(article.tags);
  await viewArticlePage.assertArticleTagListIsVisible(tag);
});
