import { test} from '@playwright/test';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { generateNewDescription } from '../../src/common/testData/generateNewArticleData';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { reloadPage } from '../../src/ui/actions/article/waitForUrlAndReloadHelpers';

let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({page}) => {
    const user = generateNewUserData();
    const article = generateNewArticleData();

    editArticlePage = new EditArticlePage(page);
    viewArticlePage = new ViewArticlePage(page);

    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Edit the article description', async ({page}) => {
    const newDescription = generateNewDescription();

    await viewArticlePage.openEditor();
    await editArticlePage.editDescriptionField(newDescription);
    await editArticlePage.assertDescriptionEdited(newDescription);
    await editArticlePage.updateArticle();
    await reloadPage(page);
    await viewArticlePage.openEditor();
    await editArticlePage.assertDescriptionEdited(newDescription);
})