import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { addTagToExistingArticleWithoutTags, addTagToExistingArticleWithTags } from '../../src/ui/actions/article/editArticle';


test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  await signUpUser(page, user);

});

test.describe('Add tags', () => {
test('Add the tag for the existing article without tags', async ({ page }) => {
  const article = generateNewArticleData();
  await createNewArticle(page, article);
  await addTagToExistingArticleWithoutTags(page, article);
  
});

test('Add the tag for the existing article with tags', async ({ page }) => {
  const article = generateNewArticleData(3);
  await createNewArticle(page, article);
  await addTagToExistingArticleWithTags(page, article);
  
});
});