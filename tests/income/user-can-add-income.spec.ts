
import {test, expect} from "../../fixtures/dashboard.fixtures";
test("User can add an income source of $1000 and it displays in the table", async ({ toastMessage,dashboardPage,page }) => {
    await page.goto("/dashboard");
    await expect(dashboardPage.page).toHaveURL("/dashboard");
    /**
     * Adds the income
     */
    await dashboardPage.scrollToBottomOfPage();
    await dashboardPage.fillOutInputs("Income Name","Day Job");
    await dashboardPage.fillOutInputs("Income Amount","1000");
    await dashboardPage.clickAddIncomeButton();
    /**
     * Checks that income is listed 
     * under Incomes section
     */

    await dashboardPage.scrollToTopOfPage();
    await dashboardPage.assertIncomeIsDisplaying("incomes","Day Job — 1000");
    /**
     * Verifies that the correct
     * toast message is appearing
     */
    await toastMessage.verifyToastMessage("toast-success","Income has been added!")
});