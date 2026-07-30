import { test, expect } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ARTICLE_ERRORS } from '../../src/ui/constants/articleErrors';

test.describe('Conduit - Edit Article Feature Tests', () => {
  let userData;
  let articleData;

  test.beforeEach(async ({ page }) => {
    userData = generateNewUserData();
    articleData = generateNewArticleData();

    await signUpUser(page, userData);
    await page.goto('/editor');
    await createNewArticle(page, articleData);
  });

  test('Edit the article title for the existing article', async ({ page }) => {
    const newTitle = 'Update Title ' + Date.now();
    await test.step('Navigate to edit article page', async () => {
      await page.getByRole('link', { name: 'Edit Article' }).first().click();
      await page.waitForURL('**/editor/**');
    });

    await test.step('Edit article title', async () => {
      await editArticle(page, { title: newTitle });
      await page.waitForURL('**/article/**');
      await page.reload();
    });

    await test.step('Verify that the article title is updated', async () => {
      await expect(page.locator('h1')).toHaveText(newTitle);
    });
  });
  test('Edit the article description for the existing article', async ({
    page,
  }) => {
    const newDescription = 'Updated description content';

    await test.step('Navigate to edit article page', async () => {
      await page.getByRole('link', { name: 'Edit Article' }).first().click();
      await page.waitForURL('**/editor/**');
    });

    await test.step('Edit article description', async () => {
      await editArticle(page, { description: newDescription });
      await page.waitForURL('**/article/**');
      await page.reload();
    });

    await test.step('Verify that the article description is updated', async () => {
      await page.getByRole('link', { name: 'Home' }).click();
      await page.getByText('Global Feed').click();
      await expect(page.locator('.article-preview').first()).toContainText(
        newDescription,
      );
    });
  });
  test('Edit the article text for the existing article', async ({ page }) => {
    const newBody = 'Updated body content text markdown';

    await test.step('Navigate to edit article page', async () => {
      await page.getByRole('link', { name: 'Edit Article' }).first().click();
      await page.waitForURL('**/editor/**');
    });

    await test.step('Edit article text', async () => {
      await editArticle(page, { body: newBody });
      await page.waitForURL('**/article/**');
      await page.reload();
    });

    await test.step('Verify that the article text is updated', async () => {
      await expect(page.locator('.article-content')).toContainText(newBody);
    });
  });

  test('Add the tag for the existing article without tags', async ({
    page,
  }) => {
    await page.goto('/editor');
    const plainArticle = generateNewArticleData();
    delete plainArticle.tag;

    await createNewArticle(page, plainArticle);
    await page.waitForURL('**/article/**');
    await page.getByRole('link', { name: 'Edit Article' }).first().click();
    await page.waitForURL('**/editor/**');

    await editArticle(page, { tag: 'playwright' });

    await expect(page.locator('.tag-list')).toContainText('playwright');
  });

  test('Remove an article tag for the existing article with tag', async ({
    page,
  }) => {
    const editArticlePage = new EditArticlePage(page);

    await page.goto('/editor');
    const articleWithTag = generateNewArticleData();
    articleWithTag.tag = 'playwright';
    await createNewArticle(page, articleWithTag);

    await page.waitForURL('**/article/**');

    await page.getByRole('link', { name: 'Edit Article' }).first().click();
    await page.waitForURL('**/editor/**');

    await editArticlePage.removeTag();
    await editArticlePage.clickUpdateArticleButton();
    await page.waitForURL('**/article/**');
    await page.reload();
    await expect(page.locator('.tag-list')).not.toContainText(
      articleWithTag.tag,
    );
  });

  test('Remove an article title for the existing article', async ({ page }) => {
    const editArticlePage = new EditArticlePage(page);

    await page.goto('/editor');
    const article = generateNewArticleData();
    await createNewArticle(page, article);
    await page.waitForURL('**/article/**');
    await page.getByRole('link', { name: 'Edit Article' }).first().click();
    await page.waitForURL('**/editor/**');

    await editArticlePage.clearTitleField();

    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERRORS.titleRequired,
    );
  });

  test('Remove an article description for the existing article', async ({
    page,
  }) => {
    const editArticlePage = new EditArticlePage(page);

    await page.goto('/editor');
    const article = generateNewArticleData();
    await createNewArticle(page, article);
    await page.waitForURL('**/article/**');
    await page.getByRole('link', { name: 'Edit Article' }).first().click();
    await page.waitForURL('**/editor/**');

    await editArticlePage.clearDescriptionField();
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERRORS.descriptionRequired,
    );
  });

  test('Edit multiple fields simultaneously', async ({ page }) => {
    const editArticlePage = new EditArticlePage(page);

    await page.goto('/editor');
    const article = generateNewArticleData();
    await createNewArticle(page, article);
    await page.waitForURL('**/article/**');

    await page.getByRole('link', { name: 'Edit Article' }).first().click();
    await page.waitForURL('**/editor/**');

    const multiUpdate = {
      title: 'Completely New Title ' + Date.now(),
      description: 'New fresh description',
      body: 'Updated full markdown body text',
    };

    await editArticle(page, multiUpdate);

    await page.waitForURL('**/article/**');
    await page.reload();

    await expect(page.locator('h1')).toHaveText(multiUpdate.title);
    await expect(page.locator('.article-content')).toContainText(
      multiUpdate.body,
    );
  });
});
