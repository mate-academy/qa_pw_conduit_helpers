import { test } from '@playwright/test';
import { SignInPage } from '../../src/pages/SignInPage';

test.describe('Sign in negative tests', () => {
  let signInPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    await signInPage.open();
  });

  test('Sign in with empty password', async () => {
    await signInPage.fillEmailField('test@gmail.com');
    await signInPage.clickSignInButton();
    await signInPage.assertErrorMessageContainsText(`password:can't be blank`);
  });

  test('Sign in with empty email', async () => {
    await signInPage.fillPasswordField('newpass123!');
    await signInPage.clickSignInButton();
    await signInPage.assertErrorMessageContainsText(`email:can't be blank`);
  });

  test('Sign in with wrong password', async () => {
    await signInPage.fillEmailField('test@gmail.com');
    await signInPage.fillPasswordField('1');
    await signInPage.clickSignInButton();
    await signInPage.assertErrorMessageContainsText(
      `email or password:is invalid`,
    );
  });
});
