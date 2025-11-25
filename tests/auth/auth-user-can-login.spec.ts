import {test, expect} from "@playwright/test";

test("User can log in and lands on the dashboard page", async ({page}) => {
    const email = process.env.TESTING_EMAIL!;
    const password = process.env.TESTING_PASSWORD!;
    await page.goto("/login");
    /**
     * Checks that we are on the login page and that
     * the email and password inputs are visible
     * */
    await expect(page).toHaveURL("/login");
    await expect(page.getByPlaceholder('Email')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toBeVisible()
    /**
     * Fills out inputs and logs in
     * */
    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Password").fill(password)
    await page.getByRole("button", {name: "Log In"}).click();
    await expect(page).toHaveURL('/dashboard');
})