import { SettingsPage } from '../../pages/auth/SettingsPage';
import { test } from '@playwright/test';

export async function signOutUser(page) {
  await test.step(`Sign out user`, async () => {
    const settingsPage = new SettingsPage(page);

    await settingsPage.open();
    await settingsPage.clickLogoutButton();
  });
}
