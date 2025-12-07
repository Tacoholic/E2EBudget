import {test, expect} from  "../fixtures/auth.fixtures"

test("User can log out", async ({authPage, page}) => {
    const email = process.env.TESTING_EMAIL!;
    const password = process.env.TESTING_PASSWORD!;
    
    await authPage.goToLoginPage();
    await expect(authPage.page).toHaveURL("/login")
    await authPage.loginUser(email,password);
    await authPage.clickLogoutButton();
    await expect(authPage.page).toHaveURL("/login")
    await expect(page.getByRole('heading', {level:2, name: "Login Page"})).toBeVisible();
});
