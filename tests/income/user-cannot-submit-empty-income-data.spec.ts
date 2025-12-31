import {test, expect} from "../../fixtures/dashboard.fixtures";


test("Toast warning message should appear if Income Name input is empty", async({toastMessage, page, dashboardPage})=>{

    await page.goto("/dashboard");
    await expect(dashboardPage.page).toHaveURL("/dashboard");
    await dashboardPage.scrollToBottomOfPage();
    await dashboardPage.fillOutInputs("Income Amount","1000");
    await dashboardPage.clickAddIncomeButton();
    await toastMessage.verifyToastMessage("toast-warning", "Please enter a name for the income!");
});


test("Toast warning message should appear if Income Amount input is empty", async({toastMessage, page, dashboardPage})=>{

    await page.goto("/dashboard");
    await expect(dashboardPage.page).toHaveURL("/dashboard");
    await dashboardPage.scrollToBottomOfPage();
    await dashboardPage.fillOutInputs("Income Name","Job");
    await dashboardPage.clickAddIncomeButton();
    await toastMessage.verifyToastMessage("toast-warning", "Amount must be greater than 0");
});

test("Toast warning message should appear if Income Amount is a negative number", async({toastMessage, page, dashboardPage})=>{

    await page.goto("/dashboard");
    await expect(dashboardPage.page).toHaveURL("/dashboard");
    await dashboardPage.scrollToBottomOfPage();
    await dashboardPage.fillOutInputs("Income Name","Job");
        await dashboardPage.fillOutInputs("Income Amount","-1000");
    await dashboardPage.clickAddIncomeButton();
    await toastMessage.verifyToastMessage("toast-warning", "Amount must be greater than 0");
});