import {test as base } from "@playwright/test";
import { ToastMessageClass } from "../pages/toastMessages.page";
import { DashboardPage } from "../pages/dashboard.page";


export const test = base.extend<{
 dashboardPage: DashboardPage;
 toastMessage: ToastMessageClass;

}>({

dashboardPage: async ({page}, use) => {
    await use(new DashboardPage(page));;
},
 toastMessage: async ({ page }, use) => {
    await use(new ToastMessageClass(page));
  },
})

export {expect} from "@playwright/test";