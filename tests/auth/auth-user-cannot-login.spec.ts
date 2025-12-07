import {test, expect} from  "../fixtures/auth.fixtures"

test("User cannot login if account does not exist", async ({authPage}) => {
     await authPage.goToLoginPage();
     await expect(authPage.page).toHaveURL("/login");
     await authPage.fillOutEmailInput("random@email.com");
     await authPage.fillOutPasswordInput("123456");
     await authPage.clickLoginButton();
     await authPage.verifyErrorMessage("User not found!");
});


test("Existing user cannot login with the wrong password", async ({authPage}) => {
    const email = process.env.TESTING_EMAIL_2!;

    await authPage.goToLoginPage();
    await expect(authPage.page).toHaveURL("/login");
    await authPage.fillOutEmailInput(email);
    await authPage.fillOutPasswordInput("12345");
    await authPage.clickLoginButton();
    await authPage.verifyErrorMessage("Password is invalid");
});
   

test("Testing case sensitivity - email account in all uppercase", async ({authPage}) =>{
    const email = process.env.TESTING_EMAIL_ALL_UPPERCASE!
    const password = process.env.TESTING_PASSWORD!;
    
    await authPage.goToLoginPage();
    await expect(authPage.page).toHaveURL("/login");
    await authPage.fillOutEmailInput(email);
    await authPage.fillOutPasswordInput(password);
    await authPage.clickLoginButton();
    await authPage.verifyErrorMessage("User not found!");
});

test("Testing case sensitivty - password in all uppercase", async ({authPage}) => {
    const email = process.env.TESTING_EMAIL_2!
    const password = process.env.TESTING_PASSWORD_ALL_UPPERCASE!
    
    await authPage.goToLoginPage();
    await expect(authPage.page).toHaveURL("/login");
    await authPage.fillOutEmailInput(email);
    await authPage.fillOutPasswordInput(password);
    await authPage.clickLoginButton();
    await authPage.verifyErrorMessage("Password is invalid");
});