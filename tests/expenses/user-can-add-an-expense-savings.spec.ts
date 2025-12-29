
import {test, expect} from "../../fixtures/dashboard.fixtures";
test("User can add savings and it displays in the table", async ({toastMessage,dashboardPage,page }) => {
    await page.goto("/dashboard");
    await expect(dashboardPage.page).toHaveURL("/dashboard");
    /**
     * Adds the expense
     */
    await dashboardPage.scrollToBottomOfPage();
    await dashboardPage.selectExpenseCategory("Savings");
    await dashboardPage.fillOutInputs("Expense Name", "Savings");
    await dashboardPage.fillOutInputs("Expense Amount", "100");
    await dashboardPage.clickAddExpenseButton();
    /**
     * Checks that Rent is displaying
     * Checks correct toast message is appearing
     */
    await dashboardPage.scrollToTopOfPage();
    dashboardPage.assertExpenseIsDisplaying("category-savings","Savings — $100");
    await toastMessage.verifyToastMessage("toast-success","Successfully added expense!");

});