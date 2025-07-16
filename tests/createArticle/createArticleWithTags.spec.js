import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticleWithTag } from '../../src/ui/actions/article/createNewArticle';
import { test } from '@playwright/test';

let article;
let viewArticlePage;

test.beforeEach(async ({page}) => {
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(1);
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createArticleWithTag(page, article);
})

test(`Create article with tags`, async () => {
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  await viewArticlePage.assertArticleTextIsVisible(article.tags);
})
