import { test } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';

test.describe('Sign up negative tests', () => {
  let signUpPage;
  let user;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.open();
    user = generateNewUserData();
  });

  test('Sign up with empty username', async () => {
    await signUpPage.fillEmailField(user.email);
    await signUpPage.fillPasswordField(user.password);
    await signUpPage.clickSignUpButton();

    await signUpPage.assertErrorMessageContainsText(EMPTY_USERNAME_MESSAGE);
  });

  test('Sign up with empty email', async () => {
    await signUpPage.fillUsernameField(user.username);
    await signUpPage.fillPasswordField(user.password);
    await signUpPage.clickSignUpButton();

    await signUpPage.assertErrorMessageContainsText(INVALID_EMAIL_MESSAGE);
  });

  test('Sign up with empty password', async () => {
    await signUpPage.fillUsernameField(user.username);
    await signUpPage.fillEmailField(user.email);
    await signUpPage.clickSignUpButton();

    await signUpPage.assertErrorMessageContainsText(EMPTY_PASSWORD_MESSAGE);
  });
});
