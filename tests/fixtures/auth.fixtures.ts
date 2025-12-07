import { test as base } from "@playwright/test";
import { AuthPage } from "../pages/auth.page";

export const test = base.extend<{
  authPage: AuthPage;
}>({
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },
});

export { expect } from "@playwright/test";
