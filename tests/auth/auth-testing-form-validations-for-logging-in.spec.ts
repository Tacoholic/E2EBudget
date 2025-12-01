import {test, expect} from "@playwright/test";


test("User cannot login with an invalid email address", async ({page}) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/login");
    await page.getByPlaceholder("Password").fill("12131213")
    await page.getByPlaceholder("Email").fill("web.com")
    await page.getByRole("button", {name: "Log In"}).click();
    await expect(page.getByTestId("login-error")).toHaveText("Please enter a valid email", {timeout: 5000});
})

test("User cannot login with an empty email input", async ({page}) => {
  await page.goto("/login")
  await expect(page).toHaveURL("/login")
  await page.getByPlaceholder("Email").fill("");
  await page.getByPlaceholder("Password").fill("1234355")
  await page.getByRole("button", {name: "Log In"}).click()
  await expect(page.getByTestId("login-error")).toHaveText("Please enter a valid email", {timeout: 5000});

})


test("User cannot login by sending an empty password input", async ({page}) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/login");
    await page.getByPlaceholder("Email").fill("asda@asdsad.com")
    await page.getByPlaceholder("Password").fill("")
    await page.getByRole("button", {name: "Log In"}).click();
    await expect(page.getByTestId("login-error")).toHaveText("Password is required", {timeout: 5000});
})

test("User cannot login with both email and password inputs empty", async ({page}) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/login");
    await page.getByRole("button", {name: "Log In"}).click();
    await expect(page.getByTestId("login-error")).toHaveText("You need to enter your email and password")
})