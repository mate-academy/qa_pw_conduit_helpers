import { test } from '@playwright/test';
import { generateNewArticleData } from '../../../common/testData/generateNewArticleData';
import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { createNewArticle } from './createNewArticle';
import { TITLE_CANNOT_BE_EMPTY } from '../../constants/articleErrorMessages';

export async function createArticleWithRequiredFields(page) {
  return test.step(`Create article with required fields`, async () => {
    const article = generateNewArticleData();
    await createNewArticle(page, article);
    return article;
  });
}

export async function createArticleWithTags(page, tagCount = 2) {
  return test.step(`Create article with tags`, async () => {
    const article = generateNewArticleData(tagCount);
    await createNewArticle(page, article);
    return article;
  });
}

export async function publishArticleWithoutRequiredFields(page) {
  return test.step(`Publish article without required fields`, async () => {
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await homePage.clickNewArticleLink();
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      TITLE_CANNOT_BE_EMPTY
    );
  });
}
