import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test('Add a tag for the existing article with tags', async ({ page }) => {
  const user = generateNewUserData();
  const article = generateNewArticleData({ tagsCount: 1 });
  const newTag = 'playwright';

  await signUpUser(page, user);
  await createNewArticle(page, article);

  const viewArticlePage = new ViewArticlePage(page);
  const editArticlePage = new CreateArticlePage(page);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTagsField(newTag);
  await editArticlePage.clickUpdateArticleButton();

  // перевіряємо і новий тег, і що старі лишились
  await viewArticlePage.assertTagIsVisible(newTag);
  for (const existingTag of article.tags) {
    await viewArticlePage.assertTagIsVisible(existingTag);
  }
});
