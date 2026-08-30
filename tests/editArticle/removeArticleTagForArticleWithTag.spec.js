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
  article = generateNewArticleData(3)

  await signUpUser(page, user)
  await createNewArticle(page, article)
})

test('Remove an article tag for the existing article with tag', async () => {
  await viewArticlePage.clickOnEditArticleButton();

  let deleteTag = article.tags[1];
  console.log(deleteTag)

  await createArticlePage.deleteAddedTag(deleteTag);
  await createArticlePage.clickUpdateArticleButton();
  
  await viewArticlePage.page.waitForURL('**/article/**');
  await viewArticlePage.page.reload();
  await viewArticlePage.assertArticleTagIsVisible(article.tags[0]);
  await viewArticlePage.assertArticleTagIsVisible(article.tags[2]);
  await viewArticlePage.assertArticleHasNotTag(deleteTag);

})