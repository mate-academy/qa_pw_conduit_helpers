import { test } from '@playwright/test';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { generateNewUserData } from '../../src/common/helpers/generateNewUserData';
import {
  EMPTY_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  INVALID_EMAIL_OR_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';

test.describe('Sign in negative tests', () => {
  let signInPage;
  let user;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    await signInPage.open();
    user = generateNewUserData();
  });

  test('Sign in with empty password', async () => {
    await signInPage.fillEmailField(user.email);
    await signInPage.clickSignInButton();
    await signInPage.assertErrorMessageContainsText(EMPTY_PASSWORD_MESSAGE);
  });

  test('Sign in with empty email', async () => {
    await signInPage.fillPasswordField(user.password);
    await signInPage.clickSignInButton();
    await signInPage.assertErrorMessageContainsText(EMPTY_EMAIL_MESSAGE);
  });

  test('Sign in with wrong password', async () => {
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField('1');
    await signInPage.clickSignInButton();
    await signInPage.assertErrorMessageContainsText(
      INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    );
  });
});
