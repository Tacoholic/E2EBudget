import { test as base } from "@playwright/test";
import { ToastMessageClass } from "../pages/toastMessages.page";


/**
 * Creating new test object 
 * with additional fields
 */
export const test = base.extend<{
  /**
   * Every test now has an object called auth
   * and it is of the type AuthPage
   */
  toastMessage: ToastMessageClass;
}>({
  /*
   * Playwright is injecting regular
   * Playwright fixtures with ({page}).
   */
  toastMessage: async ({ page }, use) => {
    //Page object is created and pass the actual Playwright page
    await use(new ToastMessageClass(page));
  },
});

export { expect } from "@playwright/test";
