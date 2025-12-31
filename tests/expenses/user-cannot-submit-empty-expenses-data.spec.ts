import {test, expect} from "../../fixtures/dashboard.fixtures";


test("Toast error message should appear for category if an option is not selected", async ({toastMessage,dashboardPage,page})=> {
await page.goto("/dashboard");
await expect(dashboardPage.page).toHaveURL("/dashboard")
await dashboardPage.scrollToBottomOfPage();
await dashboardPage.fillOutInputs("Expense Name", "Rent");
await dashboardPage.fillOutInputs("Expense Amount", "10");
await dashboardPage.clickAddExpenseButton();
await toastMessage.verifyToastMessage("toast-error","Please enter a category");
});

test("Toast error message should appear if Expense name input is not filled out", async ({toastMessage,dashboardPage,page})=> {
await page.goto("/dashboard");
await expect(dashboardPage.page).toHaveURL("/dashboard")
await dashboardPage.scrollToBottomOfPage();
await dashboardPage.selectExpenseCategory("Bills");
await dashboardPage.fillOutInputs("Expense Amount", "10");
await dashboardPage.clickAddExpenseButton();
await toastMessage.verifyToastMessage("toast-error","Please enter a name for the expense!");
});

test("Toast error message should appear if Expense amount input is not filled out", async ({toastMessage,dashboardPage,page})=> {
await page.goto("/dashboard");
await expect(dashboardPage.page).toHaveURL("/dashboard")
await dashboardPage.scrollToBottomOfPage();
await dashboardPage.selectExpenseCategory("Bills");
await dashboardPage.fillOutInputs("Expense Name", "Rent");
await dashboardPage.clickAddExpenseButton();
await toastMessage.verifyToastMessage("toast-error","Please enter an amount for the expense!");
});