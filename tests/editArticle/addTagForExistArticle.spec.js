import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ArticlePage } from '../../src/ui/pages/article/ArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';

test.describe('Add tag for existing article', () => {
  let homePage;
  let articlePage;
  let editArticlePage;
  let article;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    articlePage = new ArticlePage(page);
    editArticlePage = new EditArticlePage(page);
    article = generateNewArticleData(2);

    const user = generateNewUserData();

    await signUpUser(page, user);
    await homePage.clickNewArticleLink();
  });

  test('Add the tag for the existing article without tags', async ({
    page,
  }) => {
    const newArtTag = faker.lorem.word();

    await createNewArticle(page, article, false);
    await articlePage.clickEditArticle();
    await editArticlePage.addNewTag(newArtTag);
    await editArticlePage.clickUpdateArticleButton();
    await articlePage.refreshPageForUpdateArticlePage();

    await articlePage.assertArticleTagIsVisible(newArtTag);
  });

  test('Add the tag for the existing article with tags', async ({ page }) => {
    const newArtTag = faker.lorem.word();

    await createNewArticle(page, article, true);
    await articlePage.clickEditArticle();
    await editArticlePage.addNewTag(newArtTag);
    await editArticlePage.clickUpdateArticleButton();
    await articlePage.refreshPageForUpdateArticlePage();

    await articlePage.assertArticleTagIsVisible(newArtTag);
  });
});
