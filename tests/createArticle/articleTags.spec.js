import { test, expect } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';

let viewArticlePage;
let createArticlePage;

test.describe('Article tags', () => {
  test.beforeEach(async ({ page }) => {
    viewArticlePage = new ViewArticlePage(page);
    createArticlePage = new CreateArticlePage(page);
    const user = generateNewUserData();

    await signUpUser(page, user);
  });
  test('Add tag to existing article without tags', async ({ page }) => {
    const article = generateNewArticleData();
    const newTags = generateNewArticleData(3).tags;
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();

    for (const tag of newTags) {
      await createArticlePage.fillTagField(tag);
    }
    await createArticlePage.clickUpdateArticleButton();
    await expect(page).toHaveURL(/article/);
    await page.reload();

    await viewArticlePage.assertTagsVisible([...article.tags, ...newTags]);
  });

  test('Add tag to existing article with tags', async ({ page }) => {
    const article = generateNewArticleData(3);
    const newTags = generateNewArticleData(3).tags;
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();

    for (const tag of newTags) {
      await createArticlePage.fillTagField(tag);
    }
    await createArticlePage.clickUpdateArticleButton();
    await expect(page).toHaveURL(/article/);
    await page.reload();

    await viewArticlePage.assertTagsVisible([...article.tags, ...newTags]);
  });
});
