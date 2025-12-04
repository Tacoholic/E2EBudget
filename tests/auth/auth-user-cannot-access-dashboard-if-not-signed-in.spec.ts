import {test, expect} from "@playwright/test";



test("Logged out user should not have access to dashboard", async ({page}) => {
  await page.goto("/");
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/login/);
})