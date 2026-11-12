import { test } from '@playwright/test';

export async function reloadPage (page) {
    await test.step (`Reload page`, async () => {
        await page.waitForURL('**/article/**');
        await page.reload();
    });
}