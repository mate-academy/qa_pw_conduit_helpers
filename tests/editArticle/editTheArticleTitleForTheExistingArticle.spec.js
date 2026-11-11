import { test} from '@playwright/test';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewTitle } from '../../src/common/testData/generateNewArticleData';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

let viewArticlePage;
let editArticlePage;

test.beforeEach (async ({page}) => {
    const user = generateNewUserData();
    const article = generateNewArticleData();

    viewArticlePage = new ViewArticlePage(page);
    editArticlePage = new EditArticlePage(page);
    
    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Edit the article title', async ( {page} ) => {
    const newTitle = generateNewTitle();

    await viewArticlePage.openEditor();
    await editArticlePage.editTitleField(newTitle);
    await editArticlePage.assertTitleEdited(newTitle);
    await editArticlePage.updateArticle();
    await page.waitForURL('**/article/**');
    await page.reload();
    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});
