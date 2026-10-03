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

  test('Edit the article title for the existing article', async ({ page }) => {
    const article = generateNewArticleData();
    await createNewArticle(page, article);

    const newTitle = generateNewArticleData().title;

    await viewArticlePage.clickEditArticleLink();

    await createArticlePage.assertTitleFieldHasValue(article.title);
    await createArticlePage.clearField(createArticlePage.titleField);
    await createArticlePage.fillTitleField(newTitle);
    await createArticlePage.clickPublishArticleButton();

    // Re-open the editor and verify that the changes were saved.
    await viewArticlePage.clickEditArticleLink();

    await createArticlePage.assertTitleFieldHasValue(newTitle);
    await createArticlePage.assertDescriptionFieldHasValue(
      article.description,
    );
    await createArticlePage.assertTextFieldHasValue(article.text);

    for (const tag of article.tags) {
      await createArticlePage.assertTagIsVisible(tag);
    }
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

    await createArticlePage.clearField(createArticlePage.descriptionField);
    await createArticlePage.fillDescriptionField(newDescription);
    await createArticlePage.clickPublishArticleButton();

    // Re-open the editor and verify that the changes were saved.
    await viewArticlePage.clickEditArticleLink();

    await createArticlePage.assertTitleFieldHasValue(article.title);
    await createArticlePage.assertDescriptionFieldHasValue(newDescription);
    await createArticlePage.assertTextFieldHasValue(article.text);

    for (const tag of article.tags) {
      await createArticlePage.assertTagIsVisible(tag);
    }
  });

  test('Edit the article text for the existing article', async ({ page }) => {
    const article = generateNewArticleData();
    await createNewArticle(page, article);

    const newText = generateNewArticleData().text;

    await viewArticlePage.clickEditArticleLink();

    await createArticlePage.assertTextFieldHasValue(article.text);
    await createArticlePage.clearField(createArticlePage.textField);
    await createArticlePage.fillTextField(newText);
    await createArticlePage.clickPublishArticleButton();

    // Re-open the editor and verify that the changes were saved.
    await viewArticlePage.clickEditArticleLink();

    await createArticlePage.assertTitleFieldHasValue(article.title);
    await createArticlePage.assertDescriptionFieldHasValue(
      article.description,
    );
    await createArticlePage.assertTextFieldHasValue(newText);

    for (const tag of article.tags) {
      await createArticlePage.assertTagIsVisible(tag);
    }
  });

  test('Add the tag for the existing article without tags', async ({
    page,
  }) => {
    const article = generateNewArticleData();
    await createNewArticle(page, article);

    const newTag = `new-${Date.now()}`;

    await viewArticlePage.clickEditArticleLink();

    await createArticlePage.addTag(newTag);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertTagIsVisible(newTag);
  });

  test('Add the tag for the existing article with tags', async ({ page }) => {
    const article = generateNewArticleData(2);
    await createNewArticle(page, article);

    const newTag = `new-${Date.now()}`;

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

    await createArticlePage.clearField(createArticlePage.titleField);
    await createArticlePage.fillTitleField(updatedArticle.title);

    await createArticlePage.clearField(
      createArticlePage.descriptionField,
    );
    await createArticlePage.fillDescriptionField(
      updatedArticle.description,
    );

    await createArticlePage.clearField(createArticlePage.textField);
    await createArticlePage.fillTextField(updatedArticle.text);

    await createArticlePage.clickPublishArticleButton();

    // Re-open the editor and verify all updated values.
    await viewArticlePage.clickEditArticleLink();

    await createArticlePage.assertTitleFieldHasValue(
      updatedArticle.title,
    );
    await createArticlePage.assertDescriptionFieldHasValue(
      updatedArticle.description,
    );
    await createArticlePage.assertTextFieldHasValue(
      updatedArticle.text,
    );

    for (const tag of article.tags) {
      await createArticlePage.assertTagIsVisible(tag);
    }
  });
});
