import { test } from '@playwright/test';
import { SignInPage } from '../../pages/auth/SignInPage';

export async function signInUser(page, user) {
    await test.step('Sign in user', async () => {
        const signInPage = new SignInPage(page);

        await signInPage.open();
        await signInPage.fillEmailField(user.email);
        await signInPage.fillPasswordField(user.password);
        await signInPage.clickSignInButton();
    });
}