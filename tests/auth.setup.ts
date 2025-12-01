import { chromium, request } from '@playwright/test';

export default async () => {
  /**
   * Runs browser w/o GUI
   */
  const browser = await chromium.launch({ headless: true });
  /**
   * Isolates cookie storage from other
   */
  const context = await browser.newContext();
  /**
   * The tab we drive
   */
  const page = await context.newPage();

  /**
   * baseURL, apiURL, email and password
   * are taken from .env file. 
   * Added fallbacks in case something goes weird
   * with the .env variables
   */
  const baseURL =
    process.env.BASE_URL ??
    process.env.PLAYWRIGHT_TEST_BASE_URL ??
    "http://localhost:5173";

  const apiURL = process.env.API_URL ?? "http://localhost:3000";
  const email = process.env.TESTING_EMAIL!;
  const password = process.env.TESTING_PASSWORD!;

  try {
    
    /**
     * Create a user through the API
     */

    const api = await request.newContext();

    const registerResp = await api.post(`${apiURL}/auth/register`, {
      data: { email, password },
    });
      /**
       * If user already exists, continue with setup
       */
    if (registerResp.ok()) {
    } else {
    }

    /**
     * Navigate towards the login page
     */

    await page.goto(`${baseURL}/login`, { timeout: 20000 });

   /**
    * Clear local storage and cookies
    * after navigation
    */
;
    await page.evaluate(() => localStorage.clear());
    await context.clearCookies();

    /**
     * Reload again after clearing
     */
    await page.reload();

  /**
    * Fill out form and submitting it
  */

    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Log In" }).click();

    /**
     * Wait for the dashboard to load
     */

    /**Asserting that we are on the dashboard page */
    await page.waitForURL(`${baseURL}/dashboard`, {
      timeout: 20000,
    });

    /**
     * Wait for the page to render
     */
    await page.locator("body").waitFor({ timeout: 5000 });

    /**
     * Checks that the header text cocntains Dashboard
     */
    await page.getByRole("heading", { name: "Dashboard" }).waitFor({ timeout: 5000 });

    /**
     * Saves the storage state
     */
    await context.storageState({ path: "storageState.json" });

  } catch (err) {
    console.error("❌ Global setup failed:");
    console.error(err);

    try {
      await page.screenshot({ path: "global-setup-error.png" });
    } catch {}

    throw err;
  } finally {
    await browser.close();
  }
};
