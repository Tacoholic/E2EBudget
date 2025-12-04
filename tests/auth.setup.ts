import { chromium, request, test} from '@playwright/test';

test("Setup: authtenticate test user", async ({browser, request}) => {

  /**
   * You get fresh broswer, fresh storage
   * No cookies, no cache
   */
  const context = await browser.newContext();
  const page = await context.newPage();

  /**
   * .env values
   */
  const baseURL =
    process.env.BASE_URL ??
    process.env.PLAYWRIGHT_TEST_BASE_URL ??
    "http://localhost:5173";

  const apiURL = process.env.API_URL ?? "http://localhost:3000";
  const email = process.env.TESTING_EMAIL!;
  const password = process.env.TESTING_PASSWORD!;

/**
 * Registering test user
 */

  const registerResp = await request.post(`${apiURL}/auth/register`, {
    data: { email, password },
  });
 /**
  * If user exists, proceed with test
  */
  if (!registerResp.ok()) {
    console.log("User likely already exists. Continuing...");
  }

/**
 * Login flow
 */
  await page.goto(`${baseURL}/login`, { timeout: 20000 });
  await page.evaluate(() => localStorage.clear());
  await context.clearCookies();
  await page.reload();
  /**
   * Fill out inputs
   */
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Log In" }).click();

  await page.waitForURL(`${baseURL}/dashboard`);
  /**
   * Save storageState
   */
  await context.storageState({ path: "storageState.json" });
  /**
  * Closes browser
  */
  await context.close();
})