import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { ARTICLE_ERROR_MESSAGES } from '../../src/ui/constants/articleErrorMessages';
import { faker } from '@faker-js/faker';

let homePage;
let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();
  await signUpUser(page, user);
});

test.describe('Edit Article Tests', () => {

  test('Edit the article title for the existing article', async ({ page }) => {
    const article = generateNewArticleData();
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);

    const newTitle = faker.lorem.words();

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { title: newTitle });

    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });

  test('Edit the article description for the existing article', async ({ page }) => {
    const article = generateNewArticleData();
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);

    const newDescription = faker.lorem.sentence(6);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { description: newDescription });

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });

  test('Edit the article text for the existing article', async ({ page }) => {
    const article = generateNewArticleData();
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);

    const newText = faker.lorem.paragraphs(2);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { text: newText });

    await viewArticlePage.assertArticleTextIsVisible(newText);
  });

  test('Add the tag for the existing article with tags', async ({ page }) => {
  const article = generateNewArticleData(3); // стаття вже має теги
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);

  const additionalTag = faker.lorem.word();

  await viewArticlePage.clickEditArticleButton();
  await editArticle(page, { addTag: additionalTag });

  await viewArticlePage.assertArticleHasTag(additionalTag);
  // бонус: перевірити, що старі теги нікуди не зникли
  await viewArticlePage.assertArticleHasTag(article.tags[0]);
});

  test('Remove an article tag for the existing article with tag', async ({ page }) => {
  const article = generateNewArticleData(2); // гарантовано є теги
  const tagToRemove = article.tags[0];

  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);

  await viewArticlePage.clickEditArticleButton();
  await editArticle(page, { removeTag: tagToRemove });

  await viewArticlePage.assertArticleDoesNotHaveTag(tagToRemove);
});

  test('Remove an article title for the existing article', async ({ page }) => {
    const article = generateNewArticleData();
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { title: '' });

    await editArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERROR_MESSAGES.TITLE_CANNOT_BE_EMPTY
    );
  });

  test('Remove an article description for the existing article', async ({ page }) => {
    const article = generateNewArticleData();
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { description: '' });

    await editArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERROR_MESSAGES.DESCRIPTION_CANNOT_BE_EMPTY
    );
  });

  test('Remove the article text for the existing article', async ({ page }) => {
    const article = generateNewArticleData();
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, { text: '' });

    await editArticlePage.assertErrorMessageContainsText(
      ARTICLE_ERROR_MESSAGES.BODY_CANNOT_BE_EMPTY
    );
  });

  test('Edit article without making any changes', async ({ page }) => {
    const article = generateNewArticleData();
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);

    await viewArticlePage.clickEditArticleButton();
    await editArticle(page, {}); // просто тиснемо Update Article

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });
});