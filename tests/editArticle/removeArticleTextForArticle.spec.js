import test from "@playwright/test"
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { generateNewUserData } from "../../src/common/testData/generateNewUserData"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData"
import { ViewArticlePage } from "../../src/ui/pages/article/ViewArticlePage"
import { CreateArticlePage } from "../../src/ui/pages/article/CreateArticlePage"
import { faker } from "@faker-js/faker"
import { BODY_CANNOT_BE_EMPTY } from "../../src/ui/constants/articleErrorMessages"

let viewArticlePage
let createArticlePage

test.beforeEach(async ({page}) =>{
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page)
  
  let user = generateNewUserData()
  let article = generateNewArticleData()

  await signUpUser(page, user)
  await createNewArticle(page, article)
})

test('Remove the article text for the existing article', async () => {
  let emptyText = '';

  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.fillTextField(emptyText);
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
})