import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';

test.describe('Edit Article with existing tags', () => {
  let article;
  let viewArticlePage;
  let editArticlePage;
  let profilePage;

  test.beforeEach(async ({ page }) => {
    viewArticlePage = new ViewArticlePage(page);
    editArticlePage = new EditArticlePage(page);
    profilePage = new ProfilePage(page);
    const user = generateNewUserData();
    article = generateNewArticleData(2);

    await signUpUser(page, user);
    await createNewArticle(page, article);
    await viewArticlePage.clickEditArticleLink();
  });

  test('Edit article title', async () => {
    const updatedTitle = 'Updated Title';

    await editArticlePage.editTitleField(updatedTitle);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.waitForArticlePage();
    await viewArticlePage.page.reload();
    await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
  });

  test('Edit article description', async () => {
    const updatedDescription = 'Updated Description';

    await editArticlePage.editDescriptionField(updatedDescription);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.clickProfileLink();
    await profilePage.page.reload();
    await profilePage.assertArticleDescriptionIsVisible(updatedDescription);
  });

  test('Edit article text', async () => {
    const updatedText = 'Updated Text';

    await editArticlePage.editTextField(updatedText);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.waitForArticlePage();
    await viewArticlePage.page.reload();
    await viewArticlePage.assertArticleTextIsVisible(updatedText);
  });

  test('Add tag to article with existing tags', async () => {
    const newTag = 'new_tag';

    await editArticlePage.addArticleTag(newTag);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.waitForArticlePage();
    await viewArticlePage.page.reload();
    await viewArticlePage.assertArticleTagsAreVisible([
      ...article.tags,
      newTag,
    ]);
  });

  test('Remove article tag', async () => {
    const tagToRemove = article.tags[0];

    await editArticlePage.removeArticleTag(tagToRemove);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.waitForArticlePage();
    await viewArticlePage.page.reload();
    await viewArticlePage.assertArticleTagsAreVisible([article.tags[1]]);

    await viewArticlePage.assertArticleTagIsNotVisible(tagToRemove);
  });

  test('Edit multiple fields', async () => {
    const updatedTitle = 'Updated Title';
    const updatedDescription = 'Updated Description';
    const updatedText = 'Updated Text';

    await editArticlePage.editTitleField(updatedTitle);
    await editArticlePage.editDescriptionField(updatedDescription);
    await editArticlePage.editTextField(updatedText);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForArticlePage();
    await viewArticlePage.page.reload();
    await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
    await viewArticlePage.assertArticleTextIsVisible(updatedText);
    await viewArticlePage.clickProfileLink();
    await profilePage.page.reload();
    await profilePage.assertArticleDescriptionIsVisible(updatedDescription);
  });
});

test.describe('Edit Article without tags', () => {
  let article;
  let viewArticlePage;
  let editArticlePage;

  test.beforeEach(async ({ page }) => {
    viewArticlePage = new ViewArticlePage(page);
    editArticlePage = new EditArticlePage(page);
    const user = generateNewUserData();
    article = generateNewArticleData(0);

    await signUpUser(page, user);
    await createNewArticle(page, article);
    await viewArticlePage.clickEditArticleLink();
  });

  test('Add tag to article without tags', async () => {
    const newTag = 'new_tag';

    await editArticlePage.addArticleTag(newTag);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForArticlePage();
    await viewArticlePage.page.reload();
    await viewArticlePage.assertArticleTagsAreVisible([newTag]);
  });
});
