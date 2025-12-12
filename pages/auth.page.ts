import {Page, expect} from "@playwright/test";

export class AuthPage {
    

    constructor(public page:Page){
        this.page = page;
    }
     
    /**
     * CLICK ACTIONS
     */

    /**
     * Clicks login button
     */
    async clickLoginButton(){
        await this.page.getByRole("button", {name:"Log In"}).click();
    }

    /**
     * Clicks logout button
     */

    async clickLogoutButton(){
        await this.page.getByTestId("logout").click();
    }

    /**
     * Clicks on the create account button
     */
    async clickCreateAccountButton(){
        await this.page.getByTestId('create-account').click();
    }

    /**
     * Clicks on register button
     */
    async clickRegisterButton(){
        await this.page.getByRole('button', {name: "Register"}).click()
    }

    /**
     * NAVIGATION
     */

    /**
     * Goes to the Login Page
     */
    async goToLoginPage(){
        await this.page.goto('/login');
        await expect(this.page).toHaveURL("/login");
    }

    /**
     * Goes to the Register Page
     */
    async goToRegisterPage(){
        await this.page.goto("/register");
        await expect(this.page).toHaveURL("/register")
    }

    /**
     * Fills out email input
     * @param email 
     */
    async fillOutEmailInput(email: string){
        await this.page.locator("#email").fill(email);
    }
    /**
     * Fills out Password Input
     * @param password 
     */
    async fillOutPasswordInput(password:string){
        await this.page.locator("#password").fill(password);
    }

    /**
     * Fills out confirm password
     */
    async fillOutConfirmPassword(confirmPassword:string){
        await this.page.locator("#confirm-password").fill(confirmPassword)
    }
    /**
     * Logging in workflow
     * @param email 
     * @param password 
     */
    async loginUser(email:string, password:string){
        await this.goToLoginPage();
        await this.fillOutEmailInput(email);
        await this.fillOutPasswordInput(password);
        await this.clickLoginButton();
    }
    
    /**
     * Register user workflow 
     * @param email 
     * @param password 
     */
    async registerUser(email:string,password:string){
        await this.goToRegisterPage()
        await this.fillOutEmailInput(email)
        await this.fillOutPasswordInput(password)
        await this.fillOutConfirmPassword(password)
        await this.page.getByRole("button", {name: "Register"}).click();
    }
    
    /**
     * ASSERTIONS
     */

    /**
     * This asserts the proper error messages
     * @param message 
     * @param timeout 
     */
    async verifyErrorMessage(message:string, timeout=2000){
        await expect(this.page.getByTestId("login-error")).toHaveText(message, {timeout});
    }


     async verifyErrorMessageRegistration(message:string, timeout=2000){
        await expect(this.page.getByTestId("registration-error")).toHaveText(message, {timeout});
    }
}