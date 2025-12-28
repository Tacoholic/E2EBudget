
import {test, expect} from "../../fixtures/dashboard.fixtures";
test("User can add an income source of $1000 and it displays in the table", async ({ toastMessage,dashboardPage,page }) => {
    await page.goto("/dashboard");
    await expect(dashboardPage.page).toHaveURL("/dashboard");
    /**
     * Adds the income
     */
    await dashboardPage.fillOutInputs("Name","Day Job");
    await dashboardPage.fillOutInputs("Amount","1000");
    await dashboardPage.clickAddIncomeButton();
    /**
     * Checks that income is listed 
     * under Incomes section
     */
    await expect(page.getByRole('listitem').first()).toHaveText("Day Job — 1000");
    /**
     * Verifies that the correct
     * toast message is appearing
     */
    await toastMessage.verifyToastMessage("toast-success","Income has been added!")
});