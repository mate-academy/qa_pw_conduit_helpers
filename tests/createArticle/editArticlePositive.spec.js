import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import createNewArticle from '../../src/ui/actions/article/createNewArticle';

test.describe('Edit Article Positive Tests', () => {
  let homePage;
  let viewArticlePage;
  let editArticlePage;
  let user;
  let article;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    viewArticlePage = new ViewArticlePage(page);
    editArticlePage = new EditArticlePage(page);

    user = generateNewUserData();
    await signUpUser(page, user);

    article = generateNewArticleData();
    await createNewArticle(page, article);
    await viewArticlePage.clickEditArticleButton();
  });

  test('Edit title', async () => {
    const newTitle = article.title + ' Updated';
    await editArticlePage.fillTitleField(newTitle);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });

  test('Edit description', async () => {
    const newDescription = article.description + ' Updated';
    await editArticlePage.fillDescriptionField(newDescription);
    await editArticlePage.clickUpdateArticleButton();
    // możesz dodać asercję widoczności opisu jeśli jest metoda
  });

  test('Edit text', async () => {
    const newText = article.text + ' Updated';
    await editArticlePage.fillTextField(newText);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTextIsVisible(newText);
  });

  test('Add tag', async () => {
    const newTag = 'automation';
    await editArticlePage.addTag(newTag);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertTagIsVisible(newTag);
  });

  test('Remove tag', async () => {
    const newTag = 'temporary';
    await editArticlePage.addTag(newTag);
    await editArticlePage.clickUpdateArticleButton();
    await editArticlePage.removeTag(newTag);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertTagNotVisible(newTag);
  });
});
