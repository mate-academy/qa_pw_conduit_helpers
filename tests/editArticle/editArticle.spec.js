import { test, expect } from '@playwright/test';
import { generateNewUserData } from '../../src/ui/common/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { CreateNewArticleAction } from '../../src/ui/actions/article/createNewArticle';
import { EditArticleAction } from '../../src/ui/actions/article/editArticle';
import { generateNewArticleData } from '../../src/ui/common/generateNewArticleData';

test.describe('Edit article feature', () => {
  let page;
  let user;
  let article;
  let slug;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    user = generateNewUserData();
    await signUpUser(page, user);

    article = generateNewArticleData(2);
    const createArticle = new CreateNewArticleAction(page);
    await createArticle.createNewArticle(article);

    slug = article.title.toLowerCase().replace(/\s+/g, '-');
  });

  test('Edit article title', async () => {
    const editor = new EditArticleAction(page);
    await editor.open(slug);

    const newTitle = 'Updated Title';

    await editor.editTitle(newTitle);
    await editor.submit();

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(newTitle);
  });

  test('Edit description', async () => {
    const editor = new EditArticleAction(page);
    await editor.open(slug);

    const newDescription = 'Updated Description';
    await editor.editDescription(newDescription);
    await editor.submit();

    await expect(page.locator('p')).toContainText(newDescription);
  });

  test('Edit text', async () => {
    /* … */
  });

  test('Add tag when no tags exist', async () => {
    /* … */
  });

  test('Add tag when tags exist', async () => {
    /* … */
  });

  test('Remove a tag', async () => {
    /* … */
  });

  test('Clear title', async () => {
    /* … */
  });

  test('Clear description', async () => {
    /* … */
  });

  test('Clear text', async () => {
    /* … */
  });
});
