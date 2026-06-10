import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  editExistingArticleDescription,
  editExistingArticleTitle,
} from '../../src/ui/actions/article/editExistingArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { ProfilePage } from '../../src/ui/pages/profile/ProfilePage';

test.describe('Article Management', () => {
  let originalArticle;

  test.beforeEach(async ({ page }) => {
    const user = generateNewUserData();
    originalArticle = generateNewArticleData();
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);

    await createNewArticle(page, originalArticle);
    await viewArticlePage.assertArticleTitleIsVisible(originalArticle.title);
  });

  test('Edit the article description for the existing article',
    async ({ page }) => {
    const viewArticlePage = new ViewArticlePage(page);
    const profilePage = new ProfilePage(page);
    const newDescription = `${generateNewArticleData().description}`;

    await editExistingArticleDescription(page, newDescription);
    //bug workaround
    await page.waitForTimeout(1000);
    await viewArticlePage.clickProfileImage();
    await profilePage.assertArticleDescriptionIsVisible(newDescription);
  });
});
