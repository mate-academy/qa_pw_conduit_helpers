import { test, expect } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let article;
let viewArticlePage;

// Utility to add tags to generated article
function withTags(baseArticle, tags) {
  return { ...baseArticle, tags };
}

test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  await signUpUser(page, user);
  viewArticlePage = new ViewArticlePage(page);
  article = withTags(generateNewArticleData(), ['tag1', 'e2e', 'playwright']);
});

test('Create an article with tags', async ({ page }) => {
  await createNewArticle(page, article);
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  // Assert tags visible (best-effort; adjust locator if real markup differs)
  for (const tag of article.tags) {
    await test.step(`Assert tag ${tag} is visible`, async () => {
      await expect(page.getByText(tag).first()).toBeVisible();
    });
  }
});
