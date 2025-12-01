import {test, expect} from "@playwright/test";


test("User cannot login if account does not exist", async ({page}) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/login");
    await page.getByPlaceholder("Email").fill("RandomEmail@email.com")
    await page.getByPlaceholder("Password").fill("12131213")
    await page.getByRole("button", {name: "Log In"}).click();
    await expect(page.getByTestId("login-error")).toHaveText("User not found!", {timeout: 5000});
})


test("User cannot login with the wrong password", async ({page}) => {
    const email = process.env.TESTING_EMAIL_2!;
    await page.goto("/login");
    await expect(page).toHaveURL("/login");
    await page.getByPlaceholder("Email").fill(email)
    await page.getByPlaceholder("Password").fill("12131213")
    await page.getByRole("button", {name: "Log In"}).click();
    await expect(page.getByTestId("login-error")).toHaveText("Password is invalid", {timeout: 5000});
})

test("Testing case sensitivity - email account in all uppercase", async ({page}) =>{
    const email = process.env.TESTING_EMAIL_ALL_UPPERCASE!
    const password = process.env.TESTING_PASSWORD!;
    await page.goto("/login")
    await expect(page).toHaveURL("/login");
    await page.getByPlaceholder("Email").fill(email)
    await page.getByPlaceholder("Password").fill(password)
    await page.getByRole("button", {name: "Log In"}).click()
    await expect(page.getByTestId("login-error")).toHaveText("User not found!", {timeout: 5000});

})

test("Testing case sensitivty - password in all uppercase", async ({page}) => {
    const email = process.env.TESTING_EMAIL_2!
    const password = process.env.TESTING_PASSWORD_ALL_UPPERCASE!
    await page.goto("/login")
    await expect(page).toHaveURL("/login")
    await page.getByPlaceholder("Email").fill(email)
    await page.getByPlaceholder("Password").fill(password)
    await page.getByRole("button", {name: "Log In"}).click()
    await expect(page.getByTestId("login-error")).toHaveText("Password is invalid", {timeout: 5000});
})