import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test('Remove an article tag for the existing article with tag', async ({
  page,
}) => {
  const user = generateNewUserData();
  const article = generateNewArticleData({ tagsCount: 1 });

  await signUpUser(page, user);
  await createNewArticle(page, article);

  const viewArticlePage = new ViewArticlePage(page);
  const editArticlePage = new CreateArticlePage(page);

  await viewArticlePage.assertTagIsVisible(article.tags[0]);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeTag(article.tags[0]);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertTagIsNotVisible(article.tags[0]);
});
