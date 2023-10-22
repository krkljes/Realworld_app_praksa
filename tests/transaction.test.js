const DriverFactory = require('../utils/DriverFactory');
const LoginPage = require('../pages/LoginPage');
const TransactionPage = require('../pages/TransactionPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');
const screenshotDir = "./screenshots";

chai.use(chaiAsPromised);
const expect = chai.expect;


describe('Transaction tests', function () {
  let driver;
  let loginPage;
  let transactionPage;

  beforeEach(async function () {
    // Initialize the WebDriver and open the browser
    const browserName = global.browserName || process.env.BROWSER_NAME || 'chrome'; //Browser choice - chrome, firefox, edge
    driver = DriverFactory.createDriver(browserName);
    loginPage = new LoginPage(driver);
    transactionPage = new TransactionPage(driver);
  });

   // After each test case, check if it failed and take a screenshot
   afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await transactionPage.takeScreenshot(this.currentTest.title, screenshotDir);
    }
   });

  afterEach(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Successful Payment Test', async function () {
    // Perform login
    await loginPage.performLogin();
    await transactionPage.createNewPayment();
    // Add assertions to verify successful user info edit
    await loginPage.waitForElementToBeVisible(transactionPage.successMessageField);
    const actualText = await loginPage.getText(transactionPage.successMessageField);
    expect(actualText).includes(transactionPage.transactionData.success, "Payment was not successful");

    // Additional context
    addContext(this, 'Test Case Title: Successful Payment Test');
    addContext(this, 'Test Case Description: Verify that a user can successfully create a new payment on the website');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the login page (' + loginPage.loginUrl + ')');
    addContext(this, 'Step 3: Enter a valid username (' + loginPage.username + ') in the username input field');
    addContext(this, 'Step 4: Enter a valid password (' + loginPage.password + ') in the password input field');
    addContext(this, 'Step 5: Click the "SIGN IN" button');
    addContext(this, 'Step 6: Wait for the URL to match (' + loginPage.baseUrl + ')');
    addContext(this, 'Step 7: Click on the "$ NEW" button to create a new transaction');
    addContext(this, 'Step 9: Select a random user');
    addContext(this, 'Step 10: Enter a random amount (' + transactionPage.transactionData.amount + ') for the transaction');
    addContext(this, 'Step 11: Enter a note (' + transactionPage.transactionData.note + ') for the transaction');
    addContext(this, 'Step 12: Click on the "PAY" button to complete the payment');
    addContext(this, 'Step 13: Wait for the success message (' + transactionPage.transactionData.success + ') to confirm the payment');
  });

  it('Successful Transaction Request Test', async function () {
    // Perform login
    await loginPage.performLogin();
    await transactionPage.createNewTransactionRequest();
    // Add assertions to verify successful user info edit
    await loginPage.waitForElementToBeVisible(transactionPage.successMessageField);
    const actualText = await driver.findElement(transactionPage.successMessageField);
    await transactionPage.expectTextToEqual(actualText, "Transaction request was not successful");

    // Additional context
    addContext(this, 'Test Case Title: Successful Transaction Request Test');
    addContext(this, 'Test Case Description: Verify that a user can successfully create a new transaction request on the website');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the login page (' + loginPage.loginUrl + ')');
    addContext(this, 'Step 3: Enter a valid username (' + loginPage.username + ') in the username input field');
    addContext(this, 'Step 4: Enter a valid password (' + loginPage.password + ') in the password input field');
    addContext(this, 'Step 5: Click the "SIGN IN" button');
    addContext(this, 'Step 6: Wait for the URL to match (' + loginPage.baseUrl + ')');
    addContext(this, 'Step 7: Click on the "$ NEW" button to create a new transaction');
    addContext(this, 'Step 9: Select a random user');
    addContext(this, 'Step 10: Enter a random amount (' + transactionPage.transactionData.amount + ') for the transaction');
    addContext(this, 'Step 11: Enter a note (' + transactionPage.transactionData.note + ') for the transaction');
    addContext(this, 'Step 12: Click on the "REQUEST" button to create a transaction request');
    addContext(this, 'Step 13: Wait for the success message (' + transactionPage.transactionData.success + ') to confirm the request was successfully sent');
  });
});