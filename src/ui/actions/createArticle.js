import { CreateArticlePage } from '../pages/article/CreateArticlePage';
import { generateNewArticleData } from '../../common/testData/generateNewArticleData';
import { HomePage } from '../pages/HomePage';




export async function createNewArticle(isTagAdded, page) {
    const articleData = generateNewArticleData(2);
    const createArticlePage = new CreateArticlePage(page);
    const homePage = new HomePage(page);

    await homePage.clickOnCreateNewArticleButton();
    await createArticlePage.fillTitleField(articleData.title);
    await createArticlePage.fillDescriptionField(articleData.description);
    await createArticlePage.fillTextField(articleData.text);
    if(isTagAdded) {
        await createArticlePage.fillTagField(articleData.tags.toString());
    }
    await createArticlePage.clickOnPublishArticleButton();

    return articleData;
}