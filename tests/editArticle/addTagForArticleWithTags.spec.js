import test from "@playwright/test"
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { generateNewUserData } from "../../src/common/testData/generateNewUserData"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData"
import { ViewArticlePage } from "../../src/ui/pages/article/ViewArticlePage"
import { CreateArticlePage } from "../../src/ui/pages/article/CreateArticlePage"
import { faker } from "@faker-js/faker"

let viewArticlePage
let createArticlePage
let article; 

test.beforeEach(async ({page}) =>{
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page)
  
  let user = generateNewUserData()
  article = generateNewArticleData(2)

  await signUpUser(page, user)
  await createNewArticle(page, article)
})

test.only('Add the tag for the existing article with tags', async () => {
  let newTag = faker.lorem.word();

  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.addArticleTag(newTag);
  await createArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.page.reload();
  await viewArticlePage.page.waitForLoadState('networkidle');

  await viewArticlePage.assertArticleTagIsVisible(newTag);

  for (let tag of article.tags) {
      await viewArticlePage.assertArticleTagIsVisible(tag);
  }

})