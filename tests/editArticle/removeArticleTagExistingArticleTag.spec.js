import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

let homePage;
let editArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData(1);

  await signUpUser(page, user);
  await createNewArticle(page, article);

});

test('remove the tag of an existing article with tags', async () => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.clearTagsField();
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertTagIsNotVisible(article.tags[0]);
});
