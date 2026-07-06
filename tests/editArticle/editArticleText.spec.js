import { test } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();
  const article = generateNewArticleData(5);

  await signUpUser(page, user);
  await createNewArticle(page, article);

  await viewArticlePage.clickEditButton();
});

test('Edit the article text for the existing article', async ({ page }) => {
  const newBodyText = 'Good day';

  await editArticlePage.updateTextField(newBodyText);
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForTimeout(1000);
  await page.reload();

  await viewArticlePage.assertArticleTextIsVisible(newBodyText);
});
