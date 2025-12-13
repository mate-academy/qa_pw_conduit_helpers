import { test } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.describe('Sign up positive tests', () => {
  let signUpPage;
  let homePage;
  let user;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    homePage = new HomePage(page);
    user = generateNewUserData();
  });

  test('Successful Sign Up flow', async ({ page }) => {
    await signUpUser(page, user);
    await homePage.assertYourFeedTabIsVisible(); // sprawdza, że użytkownik zalogowany po rejestracji
  });
});
