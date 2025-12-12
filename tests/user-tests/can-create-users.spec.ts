import {test, expect} from "../../fixtures/auth.fixtures";


test("User is created and redirected to the dashboard page", async ({authPage, page}) => {
     await authPage.goToLoginPage();
     await expect(authPage.page).toHaveURL("/login");
     await authPage.clickCreateAccountButton();
     await expect(page).toHaveURL("/register")
     await authPage.fillOutEmailInput("random@random.com");
     await authPage.fillOutPasswordInput("123456");
     await authPage.fillOutConfirmPassword("123456");
     await authPage.clickRegisterButton();
     await page.goto("/dashboard ");
});