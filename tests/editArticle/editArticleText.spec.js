import { test, expect } from '@playwright/test';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let editArticlePage;
let articleSlug;

test.beforeEach(async ({ page }) => {
  editArticlePage = new EditArticlePage(page);
  const user = generateNewUserData();
  const article = generateNewArticleData(1);

  await signUpUser(page, user);
  articleSlug = await createNewArticle(page, article); // returns slug from URL
});

test('Edit the article text for the existing article', async () => {
  const updatedBody = 'Updated article text shown on the view page.';

  // Act: Open editor, update the body, and publish
  await editArticlePage.open(articleSlug);
  await editArticlePage.fillBodyField(updatedBody);
  await editArticlePage.clickUpdateArticleButton();

  // Assert: Check the updated body is shown on the article view page
  await expect(editArticlePage.page.locator('.article-content p'))
    .toHaveText(updatedBody);
});
