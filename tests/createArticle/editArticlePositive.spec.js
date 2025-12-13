import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import createNewArticle from '../../src/ui/actions/article/createNewArticle';

test('edit article positive tests', async ({ page }) => {
  const homePage = new HomePage(page);
  const viewArticlePage = new ViewArticlePage(page);
  const editArticlePage = new EditArticlePage(page);

  const user = generateNewUserData();
  await signUpUser(page, user);

  const article = generateNewArticleData();
  await createNewArticle(page, article);

  // Przejdź do edycji artykułu
  await viewArticlePage.clickEditArticleButton();

  // Edytuj tytuł, opis i tekst
  const newTitle = article.title + ' Updated';
  const newDescription = article.description + ' Updated';
  const newText = article.text + ' Updated';

  await editArticlePage.fillTitleField(newTitle);
  await editArticlePage.fillDescriptionField(newDescription);
  await editArticlePage.fillTextField(newText);

  // Dodaj nowy tag
  const newTag = 'automation';
  await editArticlePage.addTag(newTag);

  await editArticlePage.clickUpdateArticleButton();

  // Assercje
  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  await viewArticlePage.assertArticleTextIsVisible(newText);
  await viewArticlePage.assertTagIsVisible(newTag);
});
