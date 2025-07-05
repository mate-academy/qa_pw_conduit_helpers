import { test, expect } from '@playwright/test';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let editArticlePage;
let articleSlug;

test.beforeEach(async ({ page }) => {
  // Initialize EditArticlePage object
  editArticlePage = new EditArticlePage(page);

  // Generate a user and article
  const user = generateNewUserData();
  const article = generateNewArticleData(1); // with 1 tag

  // Sign up and create article
  await signUpUser(page, user);
  articleSlug = await createNewArticle(page, article); // returns article slug
});

test('Edit the article description for the existing article', 
  async ({ page }) => {
  const updatedDescription = 'Updated article description for testing.';

  // Open the edit article page
  await editArticlePage.open(articleSlug);

  // Fill the new description
  await editArticlePage.fillDescriptionField(updatedDescription);

  // Click Update and wait for redirect to article view
  await Promise.all([
    page.waitForURL('**/article/**'),
    editArticlePage.clickUpdateArticleButton(),
  ]);

  // Re-open the edit page to validate that the change was saved
  await editArticlePage.open(articleSlug);

  // Assert the description was updated
  await expect(editArticlePage.descriptionField)
  .toHaveValue(updatedDescription);
});
