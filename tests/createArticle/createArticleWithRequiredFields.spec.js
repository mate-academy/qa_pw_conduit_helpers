import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { CheckArticleUtil } from '../../src/ui/actions/article/CheckArticleUtil';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { test } from '@playwright/test';

let createArticlePage

test.beforeEach(async ({page}) => {
    const user = generateNewUserData();
    createArticlePage = new CreateArticlePage(page);
    await signUpUser(page, user);
});

test('Create an article with required fields', async ({page}) => {
    const createdArticle = await createNewArticle({}, page, createArticlePage);
    await CheckArticleUtil.checkArticleFields(createdArticle, page)
});
