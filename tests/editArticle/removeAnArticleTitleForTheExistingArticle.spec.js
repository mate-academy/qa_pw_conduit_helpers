import { test} from '@playwright/test';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData} from '../../src/common/testData/generateNewArticleData';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let viewArticlePage;
let editArticlePage;

test.beforeEach(async ({page}) => {
    viewArticlePage = new ViewArticlePage(page);
    editArticlePage = new EditArticlePage(page);

    const user = generateNewUserData();
    const article = generateNewArticleData(1);

    await signUpUser(page, user);
    await createNewArticle(page, article);
});

test('Remove article title', async () => {
    const newTitle = '';

    await viewArticlePage.openEditor();
    await editArticlePage.editTitleField(newTitle);
    await editArticlePage.assertTitleEdited(newTitle);
    await editArticlePage.updateArticle();
    await editArticlePage.assertErrorWhenTitleIsEmpty(TITLE_CANNOT_BE_EMPTY);
})