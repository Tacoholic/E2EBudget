import {test, expect} from "@playwright/test";



test("Logged out user should not have access to dashboard", async ({page}) => {
  await page.goto("/");
  /**
   * Gets rid of any stored authentication tokens
   * or user data so that the test can run as
   * an unauthenticated user
   */
  await page.evaluate(() => localStorage.clear());
  await page.goto("/dashboard");
  await expect(page).toHaveURL("/login");
})