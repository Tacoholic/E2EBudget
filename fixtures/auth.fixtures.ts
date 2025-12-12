import { test as base } from "@playwright/test";
import {AuthPage} from "../pages/auth.page";

/**
 * Creating new test object 
 * with additional fields
 */
export const test = base.extend<{
  /**
   * Every test now has an object called auth
   * and it is of the type AuthPage
   */
  authPage: AuthPage;
}>({
  /*
   * Playwright is injecting regular
   * Playwright fixtures with ({page}).
   */
  authPage: async ({ page }, use) => {
    //Page object is created and pass the actual Playwright page
    await use(new AuthPage(page));
  },
});

export { expect } from "@playwright/test";

