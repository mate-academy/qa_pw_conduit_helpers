import { test} from '@playwright/test';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewText } from '../../src/common/testData/generateNewArticleData';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { reloadPage } from '../../src/ui/actions/article/waitForUrlAndReloadHelpers';

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

test('Edit the article text', async ({page}) => {
    const newText = generateNewText();
    
    await viewArticlePage.openEditor();
    await editArticlePage.editTextField(newText);
    await editArticlePage.assertTextEdited(newText);
    await editArticlePage.updateArticle();
    await reloadPage(page);
    await viewArticlePage.assertArticleTextIsVisible(newText);
})