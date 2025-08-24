import { test } from '@playwright/test';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArtickePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
//import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';

test.describe('Edit an article with tegs', () => {
  let viewArticlePage;
  let editArticlePage;
  let article;

  test.beforeEach(async ({ page }) => {
    viewArticlePage = new ViewArticlePage(page);
    editArticlePage = new EditArticlePage(page);
    article = generateNewArticleData(3);
    const user = generateNewUserData();

    await signUpUser(page, user);
    await createNewArticle(page, article);
    console.log(article.tags);
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.assertEditArticlePageIsOpened();
  });

  test('Add the tag for the existing article with tags', async ({ page }) => {
    const newArticle = generateNewArticleData(1);

    await editArticlePage.fillTagsField(newArticle.tags);
    await editArticlePage.clickUpdateArticleButton();

    await page.waitForURL(`**/article/**`);
    await page.reload();
    await viewArticlePage.assertArtistleTagsAreVisible(newArticle.tags);
  });

  test('Remove the tag for the existing article with tags', async ({
    page,
  }) => {
    //const article = generateNewArticleData(4);
    const randomIndex = Math.floor(Math.random() * article.tags.length);
    const tagToRemove = article.tags[randomIndex];

    console.log(randomIndex);
    console.log(tagToRemove);

    await editArticlePage.removeArticleTag(tagToRemove);
    await editArticlePage.clickUpdateArticleButton();

    await page.waitForURL(`**/article/**`);
    await page.reload();
    await viewArticlePage.assertArticleTagsIsNotVisible(tagToRemove);
  });
});
