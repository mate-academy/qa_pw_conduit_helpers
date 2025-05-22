import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/createArticle';
import { test } from '../../src/fixtures/fixtures';
import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';


test.beforeEach(async ({ page }) => {
  

  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(true, page);

});

test('Remove article Text for Existing article', async({ page, createArticlePage, viewArticlePage }) => {

    await viewArticlePage.clickOnEditArticleButton();
    await createArticlePage.fillTextField('');
    await page.waitForTimeout(2000);
    await createArticlePage.clickOnUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});