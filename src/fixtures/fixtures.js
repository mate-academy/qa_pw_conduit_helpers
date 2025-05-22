import { CreateArticlePage } from '../ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../ui/pages/article/ViewArticlePage';
import { HomePage } from '../ui/pages/HomePage';
import { SignUpPage } from '../ui/pages/auth/SignUpPage';
import {test as base} from '@playwright/test';

export const test = base.extend({
  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },
  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signUp: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
});