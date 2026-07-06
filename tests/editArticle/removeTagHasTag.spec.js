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
  article = generateNewArticleData(5);

  await signUpUser(page, user);
  await createNewArticle(page, article);

  await viewArticlePage.clickEditButton();
});

test('Remove an article tag for the existing article with tag', async ({
  page,
}) => {
  const initialTags = article.tags;
  const tagsToRemove = initialTags.slice(0, 2);
  const remainingTags = initialTags.slice(2);

  await editArticlePage.deleteTags(tagsToRemove);
  await editArticlePage.clickUpdateArticleButton();

  await page.waitForTimeout(1000);
  await page.reload();

  await viewArticlePage.assertArticleTagIsDeleted(tagsToRemove);
  await viewArticlePage.assertArticleTagIsVisible(remainingTags);
});
