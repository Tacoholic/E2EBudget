import {test, expect} from "@playwright/test"

test("You cannot send empty data to create a user", async ({page}) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/login")
    await page.getByTestId("create-account").click();
    await expect(page).toHaveURL("/register")
    await page.getByRole("button", {name: "Register"}).click();
    await expect(page.getByTestId("registration-error")).toHaveText("Please enter a valid email and password")
})

test("User must enter a valid email", async ({page}) => {
    await page.goto("/login")
    await expect(page).toHaveURL("/login")
    await page.getByTestId("create-account").click();
    await expect(page).toHaveURL("/register")
    await page.locator("#email").fill("hello.com")
    await page.locator("#password").fill("Hello1234")
    await page.locator("#confirm-password").fill("Hello1234")
    await page.getByRole("button", {name: "Register"}).click();
    await expect(page.getByTestId("registration-error")).toHaveText("Invalid email format")
})

test("User must enter a password", async ({page}) => {
    await page.goto("/login")
    await expect(page).toHaveURL("/login")
    await page.getByTestId("create-account").click();
    await expect(page).toHaveURL("/register")
    await page.locator("#email").fill("hello.com")
    await page.locator("#password").fill("")
    await page.locator("#confirm-password").fill("")
    await page.getByRole('button', {name: "Register"}).click()
    await expect(page.getByTestId("registration-error")).toHaveText("Enter a password")
})


test ("Passwords must match in order for account to be created", async ({page}) => {
    await page.goto("/login")
    await expect(page).toHaveURL("/login")
    await page.getByTestId("create-account").click();
    await expect(page).toHaveURL("/register")
    await page.locator("#email").fill("hello@hello.com")
    await page.locator("#password").fill("password")
    await page.locator("#confirm-password").fill("12233")
    await page.getByRole('button', {name:"Register"} ).click();
    await expect(page.getByTestId("registration-error")).toHaveText("Passwords do not match")
})

test("Cannot register a new user with an email that's already been used", async ({page}) => {
    const email = process.env.TESTING_EMAIL!;
    const password = process.env.TESTING_PASSWORD!;
    
    await page.goto("/login")
    await expect(page).toHaveURL("/login")
    await page.getByTestId("create-account").click();
    await expect(page).toHaveURL("/register")
    await page.locator("#email").fill(email)
    await page.locator("#password").fill(password)
    await page.locator("#confirm-password").fill(password)
    await page.getByRole('button', {name: "Register"}).click()
    await expect(page.getByTestId("user-exists-error")).toHaveText("This user already exists!")

})