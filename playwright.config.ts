import { defineConfig, devices } from '@playwright/test';
import * as dotenv from "dotenv";

/**
 * Load .env into process
 */
dotenv.config();

/**
 * Checks if Playwright is running in UI mode
 */
const isUIMode =
  process.env.PW_TEST_HTML_REPORT_OPEN === '1' ||
  process.env.PLAYWRIGHT_UI === 'true';

  /**
   * If running through CLI, checks if email 
   * and or password are working
   */
if (!isUIMode) {
  if (!process.env.TESTING_EMAIL || !process.env.TESTING_PASSWORD) {
    throw new Error("Missing TESTING_EMAIL or TESTING_PASSWORD in .env");
  }
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  /**
   * Global set up.
   * Will run once before all tests.
   */
  globalSetup: './globalSetup.ts',

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
    storageState: isUIMode ? undefined : 'storageState.json',
    trace: 'on-first-retry'
  },

  webServer: {
    command: "npm run dev:test",
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },

  projects: [
   
    /**
     * Only runs the followiing test: Logged out user should not have access to dashboard
     * No cookies, no storage, no token
     */
    {
    name: "unauthenticated",
    testMatch: /auth-user-cannot-access-dashboard-if-not-signed-in\.spec\.ts/,
    use: { storageState: undefined }, 
    },
      /**
       * Browser Matrix
       */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /auth-user-cannot-access-dashboard-if-not-signed-in\.spec\.ts/
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: /auth-user-cannot-access-dashboard-if-not-signed-in\.spec\.ts/
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
     testIgnore: /auth-user-cannot-access-dashboard-if-not-signed-in\.spec\.ts/
    },
  ],
});
