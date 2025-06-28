import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ArticlePage } from '../../src/ui/pages/article/ArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { faker } from '@faker-js/faker';

test.describe('Edit Article tests', () => {
  let homePage;
  let articlePage;
  let editArticlePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    articlePage = new ArticlePage(page);
    editArticlePage = new EditArticlePage(page);

    const user = generateNewUserData();
    const article = generateNewArticleData(2);

    await signUpUser(page, user);
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article, true);
  });

  test('Edit the article title for the existing article', async () => {
    const newArticleTitle = faker.lorem.words();

    await articlePage.clickEditArticle();
    await editArticlePage.editArticleTitle(newArticleTitle);
    await editArticlePage.clickUpdateArticleButton();
    await articlePage.refreshPageForUpdateArticlePage();

    await articlePage.assertArticleTitleIsVisible(newArticleTitle);
  });

  test('Edit the article description for the existing article', async () => {
    const newArticleDescription = faker.lorem.sentence(2);

    await articlePage.clickEditArticle();
    await editArticlePage.editArticleDescription(newArticleDescription);
    await editArticlePage.clickUpdateArticleButton();
    await articlePage.refreshPageForUpdateArticlePage();
    await articlePage.clickEditArticle();

    await editArticlePage.assertArticleDescriptionChanged(
      newArticleDescription,
    );
  });

  test('Edit the article text for the existing article', async () => {
    const newArticleBody = faker.lorem.sentence(2);

    await articlePage.clickEditArticle();
    await editArticlePage.editArticleBody(newArticleBody);
    await editArticlePage.clickUpdateArticleButton();
    await articlePage.refreshPageForUpdateArticlePage();

    await articlePage.assertArticleBodyIsVisible(newArticleBody);
  });
});
