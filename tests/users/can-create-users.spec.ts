import {test, expect} from "@playwright/test"


test("User is created and redirected to the dashboard page", async ({page}) => {
 await page.goto("/login")
 await expect(page).toHaveURL("/login")
 await page.getByTestId("create-account").click();
 await expect(page).toHaveURL("/register")
 await page.getByPlaceholder("Email").fill("randomuser@random.com")
 await page.getByPlaceholder("Password").fill("Password123456")
 await page.getByRole("button", {name: "Register"}).click();
 await page.goto("/dashboard ")
})