import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/createArticle';
import { test } from '../../src/fixtures/fixtures';


test.beforeEach(async ({ page }) => {
  

  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(false, page);

});

test('Add tag for existeng article without tag', async({ page, createArticlePage, viewArticlePage }) => {

    await viewArticlePage.clickOnEditArticleButton();
    await createArticlePage.fillTagField('aheafjefh');
    await page.waitForTimeout(2000);
    await createArticlePage.clickOnUpdateArticleButton();
    await viewArticlePage.assertEditArticleButtonIsHere();
    await viewArticlePage.assertTagTextIsHere();
});