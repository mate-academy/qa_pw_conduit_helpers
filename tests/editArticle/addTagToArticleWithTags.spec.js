import { test, expect } from '@playwright/test';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let editArticlePage;
let articleSlug;
let initialTag;

test.beforeEach(async ({ page }) => {
  editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();
  const article = generateNewArticleData(1); // Article with 1 tag
  initialTag = article.tags[0];

  await signUpUser(page, user);
  articleSlug = await createNewArticle(page, article);
});

test('Add a tag to the existing article with tags', async ({ page }) => {
  const newTag = 'added-tag';

  // Act: Open edit, add another tag
  await editArticlePage.open(articleSlug);
  await editArticlePage.fillTag(newTag);
  await editArticlePage.clickUpdateArticleButton();

  // Assert: Both old and new tags are visible
 const tags = await page.locator('ul.tag-list li').allTextContents();
console.log('Tags on view page:', tags);
  await expect(page.locator('ul.tag-list')).toContainText(initialTag);
  await expect(page.locator('ul.tag-list')).toContainText(newTag);
});