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
let newTags;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  editArticlePage = new EditArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  const user = generateNewUserData();
  article = generateNewArticleData();
  newTags = generateNewArticleData(2).tags;

  await signUpUser(page, user);
  await createNewArticle(page, article);

});

test('Edit the tags of an existing article without tags', async ({page}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField(newTags);
  await editArticlePage.clickUpdateArticleButton();
  await page.waitForLoadState('networkidle');
  await page.reload();
  await viewArticlePage.assertArticleTagsAreVisible(newTags);
});
