import {test, expect} from  "../../fixtures/auth.fixtures";
test("User can log in and lands on the dashboard page", async ({authPage}) => {
    const email = process.env.TESTING_EMAIL!;
    const password = process.env.TESTING_PASSWORD!;

    await authPage.loginUser(email,password)
    await expect(authPage.page).toHaveURL("/dashboard")
   
})