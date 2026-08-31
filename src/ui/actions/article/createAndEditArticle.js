import { test } from '@playwright/test';
import { createNewArticle } from './createNewArticle';
import { editArticle } from './editArticle';

export async function createAndEditArticle(page, baseArticle, updatedFields) {
  await test.step('Create article and edit it', async () => {
    await createNewArticle(page, baseArticle);
    await editArticle(page, updatedFields);
  });
}
