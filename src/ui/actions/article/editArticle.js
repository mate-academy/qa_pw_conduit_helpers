import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function editArticle(page, updatedFields = {}) {
  const editArticlePage = new EditArticlePage(page);
  const viewArticlePage = new ViewArticlePage(page);
  const tagsToAdd = Array.isArray(updatedFields.tagsToAdd)
    ? updatedFields.tagsToAdd
    : [];
  const tagsToRemove = Array.isArray(updatedFields.tagsToRemove)
    ? updatedFields.tagsToRemove
    : [];
  const { error } = updatedFields;

  await test.step('Edit existing article', async () => {
    await editArticlePage.open();

    const fieldsToFill = [
      { placeholder: 'Article Title', value: updatedFields.title },
      {
        placeholder: `What's this article about?`,
        value: updatedFields.description,
      },
      {
        placeholder: 'Write your article (in markdown)',
        value: updatedFields.text,
      },
    ];

    const activeFields = fieldsToFill.filter(
      field => field.value !== undefined,
    );
    for (const field of activeFields) {
      await editArticlePage.fillInputField(field.placeholder, field.value);
    }

    for (const tag of tagsToAdd) {
      await editArticlePage.fillTagInputField(tag);
    }

    for (const tag of tagsToRemove) {
      await editArticlePage.removeTag(tag);
    }

    await editArticlePage.clickPublishArticleButton();

    error && (await editArticlePage.assertErrorMessageContainsText(error));
    !error &&
      updatedFields.title &&
      (await viewArticlePage.assertArticleTitleIsVisible(updatedFields.title));

    !error &&
      updatedFields.text &&
      (await viewArticlePage.assertArticleTextIsVisible(updatedFields.text));

    !error &&
      updatedFields.tagsToAdd &&
      updatedFields.tagsToAdd.length > 0 &&
      (await viewArticlePage.assertArticleTagsAreVisible(
        updatedFields.tagsToAdd,
      ));
  });
}
