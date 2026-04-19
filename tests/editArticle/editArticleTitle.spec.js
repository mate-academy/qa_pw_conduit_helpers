import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditAriclePage';

let viewArticlePage;
let editArticlePage;
let article;
let newTitle = faker.lorem.words();

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit the article title for the existing article', async () => {
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.clickEditArticleButton();  
  await editArticlePage.fillArticleTitleWithNewData(newTitle);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTitleHasText(newTitle);
}); 