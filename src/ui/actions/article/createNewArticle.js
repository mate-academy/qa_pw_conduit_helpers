import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

/**
 * Action-функція для створення статті (з тегами або без)
 * @param {import('@playwright/test').Page} page
 * @param {Object} [article={}]
 */
export async function createNewArticle(page, article = {}) {
  const stepTitle = article.title ? `"${article.title}"` : 'without title';

  await test.step(`Create a new article: ${stepTitle}`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    // 1. Заповнюємо поля (якщо значення відсутнє — передаємо порожній рядок)
    await createArticlePage.fillTitleField(article.title ?? '');
    await createArticlePage.fillDescriptionField(article.description ?? '');
    await createArticlePage.fillTextField(article.text ?? '');

    // 2. Заповнюємо теги, якщо вони передані в масиві
    if (Array.isArray(article.tags) && article.tags.length > 0) {
      await createArticlePage.fillArticleTags(article.tags);
    }

    // 3. Натискаємо кнопку публікації
    await createArticlePage.clickPublishArticleButton();

    // 4. Перевіряємо перехід на сторінку статті ТІЛЬКИ якщо заголовок і текст були передані.
    // Якщо заголовок відсутній ми очікуємо помилку на сторінці створення, тому асерти пропустяться.
    if (article.title && article.text) {
      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
    }
  });
}