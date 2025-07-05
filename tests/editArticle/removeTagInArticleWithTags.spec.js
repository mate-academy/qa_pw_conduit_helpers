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
  const article = generateNewArticleData(1); // generates 1 tag
  initialTag = article.tags[0];

  await signUpUser(page, user);
  articleSlug = await createNewArticle(page, article);
});

test('Remove an article tag for the existing article with tag', 
  async ({ page }) => {
  // Act: Open edit page, remove the tag, update the article
  await editArticlePage.open(articleSlug);

  const tagToRemove = 
  page.locator(`.tag-list .tag-default:has-text("${initialTag}")`);
  const removeButton = tagToRemove.locator('xpath=..//i'); 
  await removeButton.click();
  await editArticlePage.clickUpdateArticleButton();

  // Assert: The tag should not be visible on the view page
  const tagList = page.locator('ul.tag-list');
  await expect(tagList).not.toContainText(initialTag);
});
