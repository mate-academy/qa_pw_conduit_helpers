import { test } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.describe('Edit article positive tests', () => {
  let createArticlePage;
  let viewArticlePage;

  test.beforeEach(async ({ page }) => {
    createArticlePage = new CreateArticlePage(page);
    viewArticlePage = new ViewArticlePage(page);

    const user = generateNewUserData();
    await signUpUser(page, user);
  });

  test('Edit the article title for the existing article', async ({
    page,
  }) => {
    const article = generateNewArticleData();
    await createNewArticle(page, article);
    const newTitle = generateNewArticleData().title;

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.assertTitleFieldHasValue(article.title);
    await createArticlePage.clearTitleField();
    await createArticlePage.fillTitleField(newTitle);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });

  test('Edit the article description for the existing article', async ({
    page,
  }) => {
    const article = generateNewArticleData();
    await createNewArticle(page, article);
    const newDescription = generateNewArticleData().description;

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.assertDescriptionFieldHasValue(
      article.description,
    );
    await createArticlePage.clearDescriptionField();
    await createArticlePage.fillDescriptionField(newDescription);
    await createArticlePage.clickPublishArticleButton();

    // The description isn't rendered on the article view page, so we
    // re-open the editor and verify the field was persisted.
    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.assertDescriptionFieldHasValue(newDescription);
  });

  test('Edit the article text for the existing article', async ({
    page,
  }) => {
    const article = generateNewArticleData();
    await createNewArticle(page, article);
    const newText = generateNewArticleData().text;

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.assertTextFieldHasValue(article.text);
    await createArticlePage.clearTextField();
    await createArticlePage.fillTextField(newText);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTextIsVisible(newText);
  });

  test('Add the tag for the existing article without tags', async ({
    page,
  }) => {
    const article = generateNewArticleData();
    await createNewArticle(page, article);
    const newTag = generateNewArticleData(1).tags[0];

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.addTag(newTag);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertTagIsVisible(newTag);
  });

  test('Add the tag for the existing article with tags', async ({
    page,
  }) => {
    const article = generateNewArticleData(2);
    await createNewArticle(page, article);
    const newTag = generateNewArticleData(1).tags[0];

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.addTag(newTag);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertTagIsVisible(newTag);
    for (const tag of article.tags) {
      await viewArticlePage.assertTagIsVisible(tag);
    }
  });

  test('Remove an article tag for the existing article with tag', async ({
    page,
  }) => {
    const article = generateNewArticleData(1);
    await createNewArticle(page, article);
    const [tagToRemove] = article.tags;

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.removeTag(tagToRemove);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertTagIsNotVisible(tagToRemove);
  });

  test('Edit the title, description and text at the same time', async ({
    page,
  }) => {
    const article = generateNewArticleData();
    await createNewArticle(page, article);
    const updatedArticle = generateNewArticleData();

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.assertTitleFieldHasValue(article.title);
    await createArticlePage.assertDescriptionFieldHasValue(
      article.description,
    );
    await createArticlePage.assertTextFieldHasValue(article.text);
    await createArticlePage.clearTitleField();
    await createArticlePage.fillTitleField(updatedArticle.title);
    await createArticlePage.clearDescriptionField();
    await createArticlePage.fillDescriptionField(updatedArticle.description);
    await createArticlePage.clearTextField();
    await createArticlePage.fillTextField(updatedArticle.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
    await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);

    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.assertDescriptionFieldHasValue(
      updatedArticle.description,
    );
  });
});
