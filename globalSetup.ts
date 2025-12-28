import {chromium,request,FullConfig} from '@playwright/test';



async function globalSetup(config: FullConfig) {



  /**
   * baseURL for UI login
   */
  const baseURL =
    process.env.BASE_URL ??
    process.env.PLAYWRIGHT_TEST_BASE_URL ??
    "http://localhost:5173";

    /**
     * Baseurl for API login
     */
  const apiURL = process.env.API_URL ?? "http://localhost:3000";
  const email = process.env.TESTING_EMAIL!;
  const password = process.env.TESTING_PASSWORD!;


/**
 * Registering test user
 */

  const apiContext = await request.newContext();
  const registerResp = await apiContext.post(`${apiURL}/auth/register`, {
    data: { email, password },
  });
 /**
  * If user exists, proceed with test
  */
  if (!registerResp.ok()) {
    console.log("User likely already exists. Continuing...");
  }

/**
 * LOGIN FLOW VIA API
 */

  const loginResponse = await apiContext.post(`${apiURL}/api/auth/login`, {
    data: {email, password},
  });
  if(!loginResponse.ok()){
    throw new Error("Failed to login via API in globalSetup")
  }

  /**
   * Get token
   */
  const loginData = await loginResponse.json();
  process.stdout.write(`Login data: ${JSON.stringify(loginData)}\n`);
  const token = loginData.token;


/**
 * Launches browser
 */
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(baseURL)

  /**
   * Set auth token in localStorage
   */

  await page.evaluate(({token, userId}: {token:string, userId:string}) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId)
  }, {token:loginData.token,userId:loginData.userId})

  /**
   * Save storageState
   */
  await context.storageState({ path: "storageState.json" });
  
  /**
  * Closes browser
  */
  await browser.close();
  await apiContext.dispose();
}


export default globalSetup;