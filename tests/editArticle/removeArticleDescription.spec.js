import { test, expect } from '@playwright/test';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';


let editArticlePage;
let articleSlug;

test.beforeEach(async ({ page }) => {
  editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();
  const article = generateNewArticleData(1); // with 1 tag optionally

  await signUpUser(page, user);
  articleSlug = await createNewArticle(page, article);
});

test('Remove the article description for the existing article', 
  async ({ page }) => {
  // Act
  await editArticlePage.open(articleSlug);
  await editArticlePage.fillDescriptionField('');
  await editArticlePage.clickUpdateArticleButton();

  // Assert error message
  await expect(page.getByText(DESCRIPTION_CANNOT_BE_EMPTY)).toBeVisible();
});
