import { test} from '@playwright/test';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData, generateTag } from '../../src/common/testData/generateNewArticleData';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({page}) => {
    viewArticlePage = new ViewArticlePage(page);
    editArticlePage = new EditArticlePage(page);

    const user = generateNewUserData();
    const article = generateNewArticleData();

    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Add tag for the article without tags', async ({page}) => {
    const tag = generateTag();
    
    await viewArticlePage.openEditor();
    await editArticlePage.addNewTag(tag);
    await page.keyboard.press('Enter');
    await editArticlePage.updateArticle();
    await page.waitForURL('**/article/**');
    await page.reload();
    await viewArticlePage.assertTagisVisible(tag);
    await viewArticlePage.assertTagHasCorrectText(tag);
})
