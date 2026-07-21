import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';
import { TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';




let viewArticlePage;
let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await createNewArticle(page, article);
  await viewArticlePage.clickEditArticleButton();
});

test (`Edit an article title`, async () => {
  const updatedArticle = generateNewArticleData();
  await editArticlePage.editTitleField(updatedArticle.title);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
});


test (`Edit an article description`, async () => {
  const updatedArticle = generateNewArticleData();
  await editArticlePage.editDescriptionField(updatedArticle.description );
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.clickEditArticleButton();
  // eslint-disable-next-line max-len
  await editArticlePage.assertArticleDescriptionIsVisible(updatedArticle.description );
});

test (`Edit an article text`, async () => {
  const updatedArticle = generateNewArticleData();
  await editArticlePage.editTextField(updatedArticle.text);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
});

test ('Add the tag for the existing article without tags', async () => {
  const updatedArticle = generateNewArticleData(3);
  await editArticlePage.addTags(updatedArticle.tags);
  await editArticlePage.clickUpdateArticleButton();
  for (const tag of updatedArticle.tags) {
  await viewArticlePage.assertArticleTagIsVisible(tag);
}
});

test.describe('Edit article with tags', () => {
  test.beforeEach(async ({ page }) => {
    article = generateNewArticleData(2);
    await createNewArticle(page, article);
    await viewArticlePage.clickEditArticleButton();
  });

  test ('Add tag for existing article with tags', async () => {
    const updatedArticle = generateNewArticleData(2);
    await editArticlePage.addTags(updatedArticle.tags);
    await editArticlePage.clickUpdateArticleButton();
    for (const tag of [...article.tags, ...updatedArticle.tags]) {
      await viewArticlePage.assertArticleTagIsVisible(tag);
    }
  });

  test ('Remove tag for existing article with tags', async () => {
    const tagToRemove = article.tags[0];
    await editArticlePage.removeTag(tagToRemove);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTagIsNotVisible(tagToRemove);
  }
);})

  test(`Remove an article title`, async () => {
  await editArticlePage.clearTitleField();
  await editArticlePage.clickUpdateArticleButtonForError();
  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

  test(`Remove an article description`, async () => {
  await editArticlePage.clearDescriptionField();
  await editArticlePage.clickUpdateArticleButtonForError();
  // eslint-disable-next-line max-len
  await editArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});

  test (`Remove an article text`, async () => {
  await editArticlePage.clearTextField();
  await editArticlePage.clickUpdateArticleButtonForError();
  await editArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});