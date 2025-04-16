import { test } from '@playwright/test';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

let signInPage;
let homePage;
let user;


test.beforeEach(async ({ page }) => {
  signInPage = new SignInPage(page);
  homePage = new HomePage(page);
  user = generateNewUserData();
  await signUpUser(page, user);
  await page.context().clearCookies();
});

test('Successful `Sign in` flow test', async () => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
