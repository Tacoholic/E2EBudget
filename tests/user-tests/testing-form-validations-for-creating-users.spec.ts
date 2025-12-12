import {test, expect} from "../../fixtures/auth.fixtures";

test("You cannot send empty data to create a user", async ({authPage,page}) => {
     await authPage.goToLoginPage();
     await expect(authPage.page).toHaveURL("/login");
     await authPage.clickCreateAccountButton();
     await expect(page).toHaveURL("/register");
     await authPage.clickRegisterButton();
     await expect(page.getByTestId("registration-error")).toHaveText("Please enter a valid email and password");
});

test("User must enter a valid email", async ({authPage,page}) => {
     await authPage.goToLoginPage();
     await expect(authPage.page).toHaveURL("/login");
     await authPage.clickCreateAccountButton();
     await expect(page).toHaveURL("/register");
     await authPage.fillOutEmailInput("hello.com");
     await authPage.fillOutPasswordInput("123456");
     await authPage.fillOutConfirmPassword("1233456");
     await authPage.clickRegisterButton();
     await expect(page.getByTestId("registration-error")).toHaveText("Invalid email format");
});

test("User must enter a password", async ({authPage,page}) => {
     await authPage.goToLoginPage();
     await expect(authPage.page).toHaveURL("/login");
     await authPage.clickCreateAccountButton();
     await expect(page).toHaveURL("/register");
     await authPage.fillOutEmailInput("hello.com");
     await authPage.fillOutPasswordInput("");
     await authPage.fillOutConfirmPassword("");
     await authPage.clickRegisterButton();
     await expect(page.getByTestId("registration-error")).toHaveText("Enter a password");

});


test ("Passwords must match in order for account to be created", async ({authPage,page}) => {
     await authPage.goToLoginPage();
     await expect(authPage.page).toHaveURL("/login");
     await authPage.clickCreateAccountButton();
     await expect(page).toHaveURL("/register");
     await authPage.fillOutEmailInput("hello@hello.com");
     await authPage.fillOutPasswordInput("12124");
     await authPage.fillOutConfirmPassword("1231241412");
     await authPage.clickRegisterButton();
     await expect(page.getByTestId("registration-error")).toHaveText("Passwords do not match");

});

test("Cannot register a new user with an email that's already been used", async ({authPage,page}) => {
    const email = process.env.TESTING_EMAIL!;
    const password = process.env.TESTING_PASSWORD!;

    await page.goto("/login");
    await expect(page).toHaveURL("/login");
    await page.getByTestId("create-account").click();
    await expect(page).toHaveURL("/register");
    await page.locator("#email").fill(email);
    await page.locator("#password").fill(password);
    await page.locator("#confirm-password").fill(password);
    await authPage.clickRegisterButton(); 
    await expect(page.getByTestId("user-exists-error")).toHaveText("This user already exists!");

});