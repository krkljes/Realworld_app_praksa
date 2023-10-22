const DriverFactory = require('../utils/DriverFactory');
const NavigationPage = require('../pages/NavigationPage');
const LoginPage = require('../pages/LoginPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');
const screenshotDir = "./screenshots";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Navigation Test', function () {
  let driver;
  let loginPage;
  let navigationPage;

  beforeEach(async function () {
    // Initialize the WebDriver and open the browser
    const browserName = global.browserName || process.env.BROWSER_NAME || 'chrome'; //Browser choice - chrome, firefox, edge
    driver = DriverFactory.createDriver(browserName);
    loginPage = new LoginPage(driver);
    navigationPage = new NavigationPage(driver);
  });

   // After each test case, check if it failed and take a screenshot
   afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await navigationPage.takeScreenshot(this.currentTest.title, screenshotDir);
    }
  });

  afterEach(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Successful Navigation Through Application Test', async function () {
    // Perform login
    await loginPage.performLogin();
    // Navigate through the website
    await navigationPage.navigate();
    // Add assertions to verify successful navigation
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(navigationPage.url.loginUrl, "Navigation failed");

    // Additional context
    addContext(this, 'Test Case Title: Successful Navigation Through Application Test');
    addContext(this, 'Test Case Description: Verify that a user can successfully navigate through the application');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the login page (' + loginPage.loginUrl + ')');
    addContext(this, 'Step 3: Enter a valid username (' + loginPage.username + ') in the username input field');
    addContext(this, 'Step 4: Enter a valid password (' + loginPage.password + ') in the password input field');
    addContext(this, 'Step 5: Click the "SIGN IN" button');
    addContext(this, 'Step 6: Wait for the URL to match (' + loginPage.baseUrl + ')');
    addContext(this, 'Step 7: Click on the "EVERYONE" tab');
    addContext(this, 'Step 8: Verify that the all user\'s transaction history page (' + navigationPage.url.baseUrl + ') is displayed');
    addContext(this, 'Step 9: Click on the "FRIENDS" tab');
    addContext(this, 'Step 10: Verify that the user\'s contacts transaction history page (' + navigationPage.url.contactsTransactionsUrl + ') is displayed');
    addContext(this, 'Step 11: Click on the "MINE" tab');
    addContext(this, 'Step 12: Verify that the user\'s transaction history page (' + navigationPage.url.personalTransactionsUrl + ') is displayed');
    addContext(this, 'Step 13: Click on the "My Account" tab');
    addContext(this, 'Step 14: Verify that the user\'s profile information (' + navigationPage.url.profileUrl + ') is displayed');
    addContext(this, 'Step 15: Click on the "Bank Accounts" tab');
    addContext(this, 'Step 16: Verify that the user\'s list of bank accounts (' + navigationPage.url.accountsUrl + ') is displayed');
    addContext(this, 'Step 17: Click on the "Notifications" tab');
    addContext(this, 'Step 18: Verify that the user\'s list of notifications (' + navigationPage.url.notificationsUrl + ') is displayed');
    addContext(this, 'Step 19: Click on the "Logout" button');
    addContext(this, 'Step 20: Verify that the user is returned to the login page (' + loginPage.loginUrl + ')');
  });
});
