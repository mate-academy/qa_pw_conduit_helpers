import { editArticle } from '../../src/ui/actions/article/editArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { test } from '@playwright/test';
import { createArticleIfMissing } from '../../src/ui/actions/article/createArticleIfMissing';
import { CheckArticleUtil } from '../../src/ui/actions/article/CheckArticleUtil';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

let editArticleData;
test.beforeEach(async ({ page }) => {
    const user = generateNewUserData();
    await signUpUser(page, user);

    editArticleData = generateNewArticleData();

    await createArticleIfMissing(page)
});

test('edit article with required fields', async ({ page }) => {
    await editArticle(editArticleData, page);
    await CheckArticleUtil.checkArticleFields(editArticleData, page);
})

test('edit article with no title', async ({ page}) => {
    const clearTitleData = {
        ...editArticleData,
        title: null
    }

    await editArticle(clearTitleData, page);
    await CheckArticleUtil.checkErrorMessageVisible(clearTitleData, page)
})

test('edit article with no description', async ({ page}) => {
    const clearDescriptionData = {
        ...editArticleData,
        description: null
    }

    await editArticle(clearDescriptionData, page);
    await CheckArticleUtil.checkErrorMessageVisible(clearDescriptionData, page)
})

test('edit article with no bodyText', async ({ page}) => {
    const clearBodyData = {
        ...editArticleData,
        body: null
    }

    await editArticle(clearBodyData, page);
    await CheckArticleUtil.checkErrorMessageVisible(clearBodyData, page)
})

test('edit article with no tags', async ({ page }) => {
    const clearTitleData = {
        ...editArticleData,
        tags: null
    }

    await editArticle(clearTitleData, page);
    await CheckArticleUtil.checkArticleFields(editArticleData, page);
})
