// import {test, expect} from "@playwright/test"
// import { continuousLoggingOn } from "../pages/login.page"


// /**
//  * Skips global authentications
//  */
// test.use({ storageState: undefined });

// test("User should get error message after 5 consective password failures", async ({page})=>{

    
//     await page.goto("/login")
//     await expect(page).toHaveURL("/login")

//     for (let i = 0; i < 6; i++){
//         await continuousLoggingOn(page, i, );
//     }
//  await expect(page.getByTestId("login-error")).toHaveText("Too many login attempts. Please wait a few minutes and try again.", {timeout: 5000});
// })

/**Commenting out for now. 
 * Will come back to it and create a 
 * seperate enviroment for this test */