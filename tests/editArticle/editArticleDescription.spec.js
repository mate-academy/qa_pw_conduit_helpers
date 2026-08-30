import test from "@playwright/test"
import { signUpUser } from "../../src/ui/actions/auth/signUpUser"
import { generateNewUserData } from "../../src/common/testData/generateNewUserData"
import { createNewArticle } from "../../src/ui/actions/article/createNewArticle"
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData"
import { ViewArticlePage } from "../../src/ui/pages/article/ViewArticlePage"
import { CreateArticlePage } from "../../src/ui/pages/article/CreateArticlePage"
import { faker, HelpersModule } from "@faker-js/faker"
import { ProfilePage } from "../../src/ui/pages/ProfilePage"
import { HomePage } from "../../src/ui/pages/HomePage"

let viewArticlePage
let createArticlePage
let profilePage
let homePage

test.beforeEach(async ({page}) =>{
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  profilePage = new ProfilePage(page);
  homePage = new HomePage(page);
  
  let user = generateNewUserData()
  let article = generateNewArticleData()

  await signUpUser(page, user)
  await createNewArticle(page, article)
})

test('Edit article description', async () => {
  let newDescription = faker.lorem.sentence();

  await viewArticlePage.clickOnEditArticleButton();
  
  await createArticlePage.fillDescriptionField(newDescription);
  await createArticlePage.clickUpdateArticleButton();

  await homePage.clickOnYourProfileLink();

  await profilePage.page.reload();
  await profilePage.assertArticleDescriptionIsVisible(newDescription)

})