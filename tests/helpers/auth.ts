import { Page,expect } from "@playwright/test";


export class AuthHelper{
    constructor(private page: Page){}

    /**
     * Go to login page
     */
    async goToLoginPage(){
        await this.page.goto("/login")
        await expect(this.page).toHaveURL("/login")
    }

    /**
     * Go to register page
     */

    async goToRegisterPage(){
        await this.page.goto("/login")
        await this.page.getByTestId("create-account").click()
        await expect(this.page).toHaveURL("/register")
    }
    /**
     * Logging In method
     * @param email 
     * @param password 
     */

    async loggingIn(email:string, password:string) {
        if (email !== undefined){
            await this.page.getByPlaceholder("Email").fill(email)
        }

        if (password !== undefined) {
            await this.page.getByPlaceholder("Password").fill(password)
        }
        await this.page.getByRole("button", {name: "Log In"}).click()
    }

    /**
     * Logging Out method
     */

    async loggingOut(){
        await this.page.getByRole("button", {name: "logout"}).click()
        await expect(this.page).toHaveURL("/login")
    }

    /**
     * Registering a user method
     * @param email 
     * @param password 
     * @param confirmPasword
     */

    async registerNewUser(email:string, password:string, confirmPasword: string){
        await this.page.locator("#email").fill(email)
        await this.page.locator("#password").fill(password)
        await this.page.locator("#confirm-password").fill(confirmPasword)
        await this.page.getByRole("button", {name: "Register"}).click()
    }

    /**
     * Error messaging while trying to login
     * @param message
     */

    async errorMessagingWhileLoggingIn(message: string){
        await expect(this.page.getByTestId("login-error")).toHaveText(message, {timeout: 1000});
    }

    /**
     * Error messaging during registration
     * @param message
     */

    async errorMessagingDuringRegistration(message:string){
        await expect(this.page.getByTestId("registration-error")).toHaveText(message);
    }




}