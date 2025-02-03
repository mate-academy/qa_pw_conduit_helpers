import { test } from '@playwright/test';
import { SignInPage } from '../../src/pages/SignInPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';

test.describe('Create an article', () => {
  let homePage;
  let createArticlePage;

  test.beforeEach(async ({ page }) => {
    const signInPage = new SignInPage(page);
    homePage = new HomePage(page);
    createArticlePage = new CreateArticlePage(page);

    const user = {
      email: 'test_new_user@gmail.com',
      password: 'newpass123!',
    };

    await signInPage.open();
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField(user.password);
    await signInPage.clickSignInButton();
    await homePage.assertYourFeedTabIsVisible();
  });

  test('Creat an article without required fields', async () => {
    await homePage.clickNewArticleLink();

    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      'Article title cannot be empty',
    );
  });
});
