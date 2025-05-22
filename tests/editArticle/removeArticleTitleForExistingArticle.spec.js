import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/createArticle';
import { test } from '../../src/fixtures/fixtures';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';


test.beforeEach(async ({ page }) => {
  

  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(true, page);

});

test('Remove article title for Existing article', async({ page, createArticlePage, viewArticlePage }) => {

    await viewArticlePage.clickOnEditArticleButton();
    await createArticlePage.fillTitleField('');
    await page.waitForTimeout(2000);
    await createArticlePage.clickOnUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});