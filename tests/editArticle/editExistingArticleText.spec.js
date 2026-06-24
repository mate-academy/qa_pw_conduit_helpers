import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/article/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import {
  editExistingArticleText
} from '../../src/ui/actions/article/editExistingArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

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

  test('Edit the text for the existing article', async ({ page }) => {
    const viewArticlePage = new ViewArticlePage(page);

    const newText = generateNewArticleData().text; 
    //`${generateNewArticleData().text}`;
    await editExistingArticleText(page, newText);
    await viewArticlePage.assertArticleTextIsVisible(newText);
  });
});