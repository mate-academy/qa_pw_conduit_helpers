import { test } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let viewArticlePage;
let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();
  article = generateNewArticleData();

  await signUpUser(page, user);
  await createNewArticle(page, article);

  await viewArticlePage.clickEditButton();
});

test('Add the tag for the existing article without tags', async ({ page }) => {
  article = generateNewArticleData(3);

  const newTags = article.tags;

  await editArticlePage.updateTagsField(newTags);
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForTimeout(1000);
  await page.reload();

  await viewArticlePage.assertArticleTagIsVisible(newTags);
});
