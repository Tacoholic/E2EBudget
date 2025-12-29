
import {test,expect} from "../../fixtures/dashboard.fixtures";

test("User can add fun fund to the expenses and it displays in the table", async ({toastMessage,dashboardPage,page}) => {
    await page.goto("/dashboard");
    await expect(dashboardPage.page).toHaveURL("/dashboard");

    /**
     * Adds the expense
     */

    await dashboardPage.scrollToBottomOfPage();
    await dashboardPage.selectExpenseCategory("Fun Fund");
    await dashboardPage.fillOutInputs("Expense Name", "Concert");
    await dashboardPage.fillOutInputs("Expense Amount", "50");
    await dashboardPage.clickAddExpenseButton();

    /**
     * Checks that concert is displaying
     * Checks correct toast message is displaying
     */

    await dashboardPage.scrollToTopOfPage();
    await dashboardPage.assertExpenseIsDisplaying("category-fun-fund","Concert — $50");
    await toastMessage.verifyToastMessage("toast-success", "Successfully added expense!");
});