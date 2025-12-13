import { test } from '@playwright/test';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

test.describe('Sign in positive tests', () => {
  let signInPage;
  let user;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    await signInPage.open();
    user = generateNewUserData();
  });

  test('Sign in with correct credentials', async () => {
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField(user.password);
    await signInPage.clickSignInButton();
    await signInPage.assertUserIsLoggedIn(); // metoda w Page Object sprawdzająca, że użytkownik zalogowany
  });
});
