import { test } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

let signUpPage;
let homePage;
let user;

test.beforeEach(async ({ page }) => {
  signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  user = generateNewUserData();
});

test('Successful `Sign up` flow test', async () => {
  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();

  await homePage.assertYourFeedTabIsVisible();
});
