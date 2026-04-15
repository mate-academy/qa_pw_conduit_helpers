import { test } from '@playwright/test';
import { generateNewArticleData } from '../../../common/testData/generateNewArticleData';
import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';

export async function createNewArticle(customData = {}, page) {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);
    const articlePageData = generateNewArticleData(3);
    const data = { ...articlePageData, ...customData };

    await test.step('Navigate to Create Article page', async () => {
        await homePage.clickNewArticleLink();
    });

    await test.step(`Fill article fields: ${data.title}`, async () => {
        await createArticlePage.fillTitleField(data.title);
        await createArticlePage.fillDescriptionField(data.description);
        await createArticlePage.fillTextField(data.body);
        await createArticlePage.fillTagsField(data.tags);
    });

    await test.step('Publish the article', async () => {
        await createArticlePage.clickPublishArticleButton();
    });

    return data;
}