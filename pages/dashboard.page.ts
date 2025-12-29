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
     * Clicks on Add Income Button
     */

    async clickAddIncomeButton(){
        await this.page.getByTestId("Add Income").click();
    }
    /**
    * Clicks on the add expense button
    */

    async clickAddExpenseButton(){
        await this.page.getByTestId("Add Expense").click();
    }

    /**
     * METHODS
     */

        /**
         * Method that fills out inputs
         * @param testId 
         * @param text 
         */
    async fillOutInputs(testId:string, text:string){
        await this.page.getByTestId(testId,).fill(text)
    }


    /**
     * Method that selects an expense
     * category from the dropdown
     * @param category 
     */
    async selectExpenseCategory(category: 'Bills' | 'Fun Fund' | 'Savings'){
        const dropdown = this.page.locator('label:has-text("Category") + select');
        await dropdown.selectOption(category);
    }

    /**
     * This method scrolls to the bottom
     * of the page
     */
    async scrollToBottomOfPage(){
        await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    }

     /**
     * This method scrolls to the top
     * of the page
     */
    async scrollToTopOfPage(){
        await this.page.evaluate(() => {
        window.scrollTo(0, 0);
    });
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

    /**
     * Asserts that the expense entry is displaying correctly on 
     * the dashboard
     * @param testID 
     * @param expense 
     */
    async assertExpenseIsDisplaying(testID:string,expense:string){
    const displayedExpense = this.page
    .getByTestId(testID)
    .getByTestId("expense-item")
    .first();
     await expect(displayedExpense).toHaveText(expense);
    };
   
};