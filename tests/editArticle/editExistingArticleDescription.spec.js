import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/article/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editExistingArticleDescription } from '../../src/ui/actions/article/editExistingArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { ProfilePage } from '../../src/ui/pages/profile/ProfilePage';

let user;

test.describe('Article Management', () => {
  let originalArticle;

  test.beforeEach(async ({ page }) => {
    user = generateNewUserData();
    originalArticle = generateNewArticleData();
    const viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);

    await createNewArticle(page, originalArticle);
    await viewArticlePage.assertArticleTitleIsVisible(originalArticle.title);
  });

  test('Edit the description for the existing article', async ({ page }) => {
    // const viewArticlePage = new ViewArticlePage(page);
    const profilePage = new ProfilePage(page);

    const newDescription = generateNewArticleData().description;
    await editExistingArticleDescription(page, newDescription);

    await profilePage.clickProfileLink(user.username);
    await profilePage.assertArticleDescriptionIsVisible(newDescription);
  });
});

