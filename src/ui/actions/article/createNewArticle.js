import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { HomePage } from '../../pages/HomePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  const stepMessage = article.tags ? 
  'Create an article with tags' : 'Create an article without tags';

  await test.step(stepMessage, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const homePage = new HomePage(page);

    await homePage.clickNewArticleLink();
    
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    if (article.tags) {
      await createArticlePage.fillTagsField(article.tags);
    }

    await createArticlePage.clickPublishArticleButton();
  });
}