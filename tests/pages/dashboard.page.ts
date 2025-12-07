import { Page, expect } from "@playwright/test";

export class DashboardPage {
    constructor(public page:Page){}


    /**
     * CLICK ACTIONS
     */

    /**
     * Clicks on logout button
     */
     async clickLogoutButton(){
        await this.page.getByRole("button", {name: "Log out"}).click();
    }

    /**
     * ASSERTIONS
     */

    /**
     * Asserts that user is on dashboard page
     */
    async assertUserIsOnDashboardPage(){
        await expect(this.page).toHaveURL("/dashboard")
    }

   

}