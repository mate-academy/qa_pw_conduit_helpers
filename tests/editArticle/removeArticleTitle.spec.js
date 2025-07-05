import { test, expect } from '@playwright/test';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let editArticlePage;
let articleSlug;

test.beforeEach(async ({ page }) => {
  editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();
  const article = generateNewArticleData();

  await signUpUser(page, user);
  articleSlug = await createNewArticle(page, article);
});

test('Remove the article title for the existing article', async ({ page }) => {
  // Act: Open edit page, clear the title, and try to update
  await editArticlePage.open(articleSlug);
  await editArticlePage.fillTitleField(''); // Clear the title field
  await editArticlePage.clickUpdateArticleButton();

  // Assert: Validation error should appear
  await expect(page.getByText(TITLE_CANNOT_BE_EMPTY)).toBeVisible();

});
