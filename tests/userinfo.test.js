const DriverFactory = require('../utils/DriverFactory');
const LoginPage = require('../pages/LoginPage');
const UserInfoPage = require('../pages/UserInfoPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');
const screenshotDir = "./screenshots";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('User Info Edit Tests', function () {
  let driver;
  let loginPage;
  let userInfoPage;

  beforeEach(async function () {
    // Initialize the WebDriver and open the browser

    const browserName = global.browserName || process.env.BROWSER_NAME || 'chrome'; //Browser choice - chrome, firefox, edge
    driver = DriverFactory.createDriver(browserName);
    loginPage = new LoginPage(driver);
    userInfoPage = new UserInfoPage(driver);
  });

   // After each test case, check if it failed and take a screenshot
   afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await userInfoPage.takeScreenshot(this.currentTest.title, screenshotDir);
    }
   });
  
  afterEach(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Successful User Info Edit Test', async function () {
    // Perform login
    await loginPage.performLogin();
    await userInfoPage.editUserInfo();
    // Add assertions to verify successful user info edit
    const actualText = await driver.findElement(userInfoPage.userFullName);
    await userInfoPage.expectTextToEqual(actualText, "User info edit was not successful");

    // Additional context
    addContext(this, 'Test Case Title: Successful User Info Edit Test');
    addContext(this, 'Test Case Description: Verify that a user can successfully edit user info on the website');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the login page (' + loginPage.loginUrl + ')');
    addContext(this, 'Step 3: Enter a valid username (' + loginPage.username + ') in the username input field');
    addContext(this, 'Step 4: Enter a valid password (' + loginPage.password + ') in the password input field');
    addContext(this, 'Step 5: Click the "SIGN IN" button');
    addContext(this, 'Step 6: Wait for the URL to match (' + loginPage.baseUrl + ')');
    addContext(this, 'Step 7: Click on the "My Account" tab');
    addContext(this, 'Step 8: Enter a valid first name (' + userInfoPage.userCredentials.firstName + ') to replace the first name input field value');
    addContext(this, 'Step 9: Enter a valid last name (' + userInfoPage.userCredentials.lastName + ') to replace the last name input field value');
    addContext(this, 'Step 10: Enter a valid email (' + userInfoPage.userCredentials.email + ') to replace the email input field value');
    addContext(this, 'Step 11: Enter a valid phone number (' + userInfoPage.userCredentials.phone + ') to replace the phone number input field value');
    addContext(this, 'Step 12: Click on the "SAVE" button');
    addContext(this, 'Step 13: Verify the new user info matches the info entered');
  });
});
