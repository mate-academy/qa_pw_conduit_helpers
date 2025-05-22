import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/createArticle';
import { test } from '../../src/fixtures/fixtures';


test.beforeEach(async ({ page }) => {
  

  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(true, page);

});

test('Remove tag for existing article with tags', async({ page, createArticlePage, viewArticlePage }) => {

    await viewArticlePage.clickOnEditArticleButton();
    await createArticlePage.clickOnDeleteTagButton();
    await page.waitForTimeout(2000);
    await createArticlePage.clickOnUpdateArticleButton();
    await viewArticlePage.assertEditArticleButtonIsHere();
    await viewArticlePage.assertTagTextIsHidden();
});