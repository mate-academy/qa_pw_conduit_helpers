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
  const article = generateNewArticleData(); // no tags passed

  await signUpUser(page, user);
  articleSlug = await createNewArticle(page, article); // slug is returned
});

test('Add a tag to the existing article without tags', async () => {
  const newTag = 'e2e-test-tag';

  // Act: Open editor, add tag, publish
  await editArticlePage.open(articleSlug);
  await editArticlePage.fillTag(newTag);
  await editArticlePage.clickUpdateArticleButton();

  // Assert: Tag is visible on the article view page
  await expect(editArticlePage.page.locator('.tag-list')).toContainText(newTag);
});
