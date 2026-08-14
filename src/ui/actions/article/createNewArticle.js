import { test } from '@playwright/test';
<<<<<<< HEAD
import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function createNewArticle(page, article) {
  await test.step(`Create new article`, async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);
=======

import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';

export async function createNewArticle(page, article) {
  await test.step('Create new article', async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);
>>>>>>> f147772603554f85c0a19f52b8583ed04d72f12d

    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

<<<<<<< HEAD
    if (article.tags?.length) {
      for (const tag of article.tags) {
        await createArticlePage.addTag(tag);
      }
    }

    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
=======
    if (article.tag) {
      await createArticlePage.fillTagField(article.tag);
    }

    await createArticlePage.clickPublishArticleButton();
>>>>>>> f147772603554f85c0a19f52b8583ed04d72f12d
  });
}
