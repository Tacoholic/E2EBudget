
import {test, expect} from "../../fixtures/dashboard.fixtures";
test("User can add a bill and it displays in the table", async ({toastMessage,dashboardPage,page }) => {
    await page.goto("/dashboard");
    await expect(dashboardPage.page).toHaveURL("/dashboard");
    /**
     * Adds the expense
     */
    await dashboardPage.scrollToBottomOfPage();
    await dashboardPage.selectExpenseCategory("Bills");
    await dashboardPage.fillOutInputs("Expense Name", "Rent");
    await dashboardPage.fillOutInputs("Expense Amount", "10");
    await dashboardPage.clickAddExpenseButton();
    /**
     * Checks that Rent is displaying
     * Checks correct toast message is appearing
     */
    await dashboardPage.scrollToTopOfPage();
    dashboardPage.assertExpenseIsDisplaying("category-bills","Rent — $10");
    await toastMessage.verifyToastMessage("toast-success","Successfully added expense!");

});