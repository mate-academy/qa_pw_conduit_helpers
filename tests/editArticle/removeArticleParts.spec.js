import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ArticlePage } from '../../src/ui/pages/article/ArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { articleFieldName } from '../../src/common/enums/articleFields';
import {
  TITLE_CANNOT_EMPTY,
  BODY_CANNOT_EMPTY,
  DESCRIPTION_CANNOT_EMPTY,
} from '../../src/ui/constants/articleEditErrorMessages';

test.describe('Remove article parts in existing article', () => {
  let homePage;
  let articlePage;
  let editArticlePage;
  let article;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    articlePage = new ArticlePage(page);
    editArticlePage = new EditArticlePage(page);
    article = generateNewArticleData(1);

    const user = generateNewUserData();
    await signUpUser(page, user);
    await homePage.clickNewArticleLink();
  });

  test('Remove an article tag for the existing article with tag', async ({
    page,
  }) => {
    const removeTag = article.tags[0];

    await createNewArticle(page, article, true);
    await articlePage.clickEditArticle();
    await editArticlePage.removeArticleTag(removeTag);
    await editArticlePage.clickUpdateArticleButton();
    await articlePage.refreshPageForUpdateArticlePage();

    await articlePage.assertArticleTagIsHidden(removeTag);
  });

  test('Remove an article title for the existing article', async ({ page }) => {
    await createNewArticle(page, article, true);
    await articlePage.clickEditArticle();
    await editArticlePage.removeArticleChoiceField(articleFieldName.title);
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertArticleFieldValidationError(TITLE_CANNOT_EMPTY);
  });

  test('Remove an article description for the existing article', async ({
    page,
  }) => {
    await createNewArticle(page, article, true);
    await articlePage.clickEditArticle();
    await editArticlePage.removeArticleChoiceField(
      articleFieldName.description,
    );
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertArticleFieldValidationError(
      DESCRIPTION_CANNOT_EMPTY,
    );
  });

  test('Remove the article text for the existing article', async ({ page }) => {
    await createNewArticle(page, article, true);
    await articlePage.clickEditArticle();
    await editArticlePage.removeArticleChoiceField(articleFieldName.body);
    await editArticlePage.clickUpdateArticleButton();

    await editArticlePage.assertArticleFieldValidationError(BODY_CANNOT_EMPTY);
  });
});
