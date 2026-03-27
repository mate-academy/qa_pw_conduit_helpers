import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let viewArticlePage;
let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(3);
  const user = generateNewUserData();
  editArticlePage = new EditArticlePage(page);

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Add tag for existing article with tags', async ({ page }) => {
  const newTag = generateNewArticleData(5);
  const expectedAllTags = [...article.tags, ...newTag.tags];
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField(newTag.tags);
  await page.waitForTimeout(2000); // as the tags are not 
  // visible immediately after filling the field
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  await viewArticlePage.assertTagsAreVisible(expectedAllTags);
});
