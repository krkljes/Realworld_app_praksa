const DriverFactory = require('../utils/DriverFactory');
const AccountPage = require('../pages/AccountPage');
const LoginPage = require('../pages/LoginPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');
const screenshotDir = "./screenshots";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Account tests', function () {
  let driver;
  let loginPage;
  let accountPage;

  beforeEach(async function () {
    // Initialize the WebDriver and open the browser
    const browserName = global.browserName || process.env.BROWSER_NAME || 'chrome';
    driver = DriverFactory.createDriver(browserName);
    loginPage = new LoginPage(driver);
    accountPage = new AccountPage(driver);
  });

   // After each test case, check if it failed and take a screenshot
   afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await accountPage.takeScreenshot(this.currentTest.title, screenshotDir);
    }
  });

  afterEach(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Successful Bank Account Creation Process Test', async function () {

    // Perform login
    await loginPage.performLogin();
    // Create account
    await accountPage.createBankAccount();
    // Add assertions to verify successful account creation
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(accountPage.accountsUrl, "Bank Account Creation Process Test failed");

    // Additional context
    addContext(this, 'Test Case Title: Successful Bank Account Creation Process Test');
    addContext(this, 'Test Case Description: Verify that a user can successfully create a bank account on the website');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the login page (' + loginPage.loginUrl + ')');
    addContext(this, 'Step 3: Enter a valid username (' + loginPage.username + ') in the username input field');
    addContext(this, 'Step 4: Enter a valid password (' + loginPage.password + ') in the password input field');
    addContext(this, 'Step 5: Click the "SIGN IN" button');
    addContext(this, 'Step 6: Wait for the URL to match (' + loginPage.baseUrl + ')');
    addContext(this, 'Step 7: Click on the "Bank Accounts" button to access the account management page');
    addContext(this, 'Step 8: Click on the "CREATE" button');
    addContext(this, 'Step 9: Generate a dynamic bank name for the new account');
    addContext(this, 'Step 10: Provide the routing number (' + accountPage.account.routingNumber + ') for the bank account');
    addContext(this, 'Step 11: Enter the account number (' + accountPage.account.accountNumber + ') for the new account');
    addContext(this, 'Step 12: Click on the "SAVE" button to complete the bank account creation');
    addContext(this, 'Step 13: Wait for the URL to match (' + accountPage.accountsUrl + ')');
  });

  it('Successful Bank Account Deletion Process Test', async function () {

    // Perform login
    await loginPage.performLogin();
    // Delete account
    await accountPage.findAndDeleteBankAccountByName();
    // Add assertions to verify successful deletion
    expect(accountPage.verifyText).to.satisfy((text) => {
      return text.includes("(Deleted)") || text.includes("DELETE");
    }, 'Associated text does not meet the expected conditions.');

    // Additional context
    addContext(this, 'Test Case Title: Successful Bank Account Deletion Process Test');
    addContext(this, 'Test Case Description: Verify that a user can successfully delete a bank account on the website');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the login page (' + loginPage.loginUrl + ')');
    addContext(this, 'Step 3: Enter a valid username (' + loginPage.username + ') in the username input field');
    addContext(this, 'Step 4: Enter a valid password (' + loginPage.password + ') in the password input field');
    addContext(this, 'Step 5: Click the "SIGN IN" button');
    addContext(this, 'Step 6: Wait for the URL to match (' + loginPage.baseUrl + ')');
    addContext(this, 'Step 7: Click on the "Bank Accounts" button to access the account management page');
    addContext(this, 'Step 8: Locate the account that matches the account name (' + accountPage.accountName + ')');
    addContext(this, 'Step 9: Click the "DELETE" button matching the account name');
    addContext(this, 'Step 10: Selected bank account now has (Deleted) attached');
  });
});
