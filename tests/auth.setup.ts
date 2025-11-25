import { chromium } from '@playwright/test';

export default async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const baseURL = process.env.BASE_URL!;
    await page.goto(baseURL +'/login');

    await page.getByPlaceholder('Email').fill(process.env.TESTING_EMAIL!);
    await page.getByPlaceholder('Password').fill(process.env.TESTING_PASSWORD!);

    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL(baseURL + '/dashboard', { timeout: 10000 });

    await context.storageState({ path: 'storageState.json' });

    await browser.close();
};
