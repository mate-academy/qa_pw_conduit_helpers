import { expect, test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test('Add a tag for the existing article without tags', async ({ page }) => {
  const user = generateNewUserData();
  const article = generateNewArticleData();
  const newTag = generateNewArticleData({ tagsCount: 1 }).tags[0];

  const viewArticlePage = new ViewArticlePage(page);
  const editArticlePage = new CreateArticlePage(page);

  await signUpUser(page, user);
  await createNewArticle(page, article);

  await expect(viewArticlePage.tagPills).toHaveCount(0);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTagsField(newTag);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage.assertTagIsVisible(newTag);
});
