import { test } from '@playwright/test';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

test('Edit the article title for the existing article', async ({ page }) => {
  const user = generateNewUserData();

  const article = {
    title: 'My first article',
    description: 'Article description',
    text: 'Article text',
    tag: 'playwright',
  };

  const updatedTitle = 'Updated article title';

  await signUpUser(page, user);
  await createNewArticle(page, article);

  const viewArticlePage = new ViewArticlePage(page);
  const editArticlePage = new EditArticlePage(page);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTitleField(updatedTitle);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
});

