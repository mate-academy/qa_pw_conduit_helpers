import { test } from '@playwright/test';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';

let signInPage;
let homePage;
let user;

test.beforeEach(async ({ page }) => {
  signInPage = new SignInPage(page);
  homePage = new HomePage(page);

  user = {
    email: 'didik_1234test@gmail.com',
    password: 'didik_1234test',
  };
});

test('Successful `Sign in` flow test', async () => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
