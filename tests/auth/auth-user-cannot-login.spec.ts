import {test, expect} from "@playwright/test";


test("User cannot login with invalid credentials", async ({page}) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/login");
    await page.getByPlaceholder("Email").fill("RandomEmail@email.com")
    await page.getByPlaceholder("Password").fill("12131213")
    await page.getByRole("button", {name: "Log In"}).click();
    await expect(page.getByTestId("login-error")).toHaveText("User not found!", {timeout: 10000});
})