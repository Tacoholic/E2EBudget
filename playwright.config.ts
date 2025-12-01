import { defineConfig, devices } from '@playwright/test';
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Only enforce env validation when running in CLI mode.
 * UI mode loads before env vars initialize, so skip strict checks there.
 */
const isUIMode =
  process.env.PW_TEST_HTML_REPORT_OPEN === '1' ||
  process.env.PLAYWRIGHT_UI === 'true';

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

  use: {
    storageState: 'storageState.json',
    baseURL: process.env.BASE_URL! ?? 'http://localhost:5173',
    trace: 'on-first-retry',
    launchOptions: {
      env: {
        NODE_ENV: "test"
      }
    }
  },

  globalSetup: './tests/auth.setup.ts',
  webServer: {
  command: "npm run dev:test",
  port: 5173,
  reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: "auth-tests",
      use: { storageState: undefined, ...devices['Desktop Chrome'] },
      testMatch: /auth\.spec\.ts/
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
