import {test as base } from "@playwright/test";
import { AuthHelper } from "../helpers/auth";

export const test = base.extend<{
    auth: AuthHelper;
}>({
    auth: async ({page}, use) => {
        const helper = new AuthHelper(page)
        await use(helper)
    }
})

export {expect} from "@playwright/test"