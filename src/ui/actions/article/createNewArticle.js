import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { HomePage } from '../../pages/HomePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, articleData) {
    await test.step('Create new article', async () => { 
        const homePage = new HomePage(page);
        const createArticlePage = new CreateArticlePage(page);

        await homePage.clickNewArticleLink()
        await createArticlePage.fillTitleField(articleData.title);
        await createArticlePage.fillDescriptionField(articleData.description);
        await createArticlePage.fillTextField(articleData.text);
        
        if (articleData.tags && articleData.tags.length > 0) {
          for (const tag of articleData.tags) {
            await createArticlePage.fillTagsField(tag);
          }
        } else if (articleData.tag) {
          await createArticlePage.fillTagsField(articleData.tag);
        }

        await createArticlePage.clickPublishArticleButton();
     });
}