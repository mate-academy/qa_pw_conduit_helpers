import { test, expect } from '@playwright/test';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let editArticlePage;
let articleSlug;

test.beforeEach(async ({ page }) => {
  // Arrange: Initialize the edit article page and create a new user and article
  editArticlePage = new EditArticlePage(page);
  
  const user = generateNewUserData();
  const article = generateNewArticleData(1);

  await signUpUser(page, user);
  articleSlug = await createNewArticle(page, article); // returns slug from URL
});

test('Edit the article title for the existing article', async () => {
  const updatedTitle = 'Updated Article Title';

  // Act: Open the edit page, update title, and publish
  await editArticlePage.open(articleSlug);
  await editArticlePage.fillTitleField(updatedTitle);
  await editArticlePage.clickUpdateArticleButton();

  // Assert: The article title should reflect the updated value
  await expect(editArticlePage.page.locator('h1')).toHaveText(updatedTitle);
});