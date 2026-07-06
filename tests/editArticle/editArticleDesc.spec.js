import { test } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { HomePage } from '../../src/ui/pages/HomePage';

let viewArticlePage;
let editArticlePage;
let homePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  homePage = new HomePage(page);

  const user = generateNewUserData();
  const article = generateNewArticleData(5);

  await signUpUser(page, user);
  await createNewArticle(page, article);

  await viewArticlePage.clickEditButton();
});

test('Edit the article description for the existing article', async ({
  page,
}) => {
  const newDescText = 'Good day';

  await editArticlePage.updateDescriptionField(newDescText);
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForTimeout(1000);

  await viewArticlePage.clickHomeButton();

  await homePage.assertYourFeedTabIsVisible();

  await homePage.clickGlobalFeedTab();

  await homePage.assertArticleDescText(newDescText);
});
