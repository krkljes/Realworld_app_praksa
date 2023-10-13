const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');
const TransactionPage = require('../pages/TransactionPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Transaction tests', function () {
  let driver;

  beforeEach(async function () {
    // Initialize the WebDriver and open the browser
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Successful Payment Test', async function () {
    const loginPage = new LoginPage(driver);
    const transactionPage = new TransactionPage(driver);

    // Perform login
    await loginPage.performLogin();
    await transactionPage.createNewPayment();
    // Add assertions to verify successful user info edit
    const actualText = await loginPage.getText(transactionPage.successMessageField);
    expect(actualText).includes(transactionPage.transactionData.success, "Payment was not successful");

  });

  it('Successful Transaction Request Test', async function () {
    const loginPage = new LoginPage(driver);
    const transactionPage = new TransactionPage(driver);

    // Perform login
    await loginPage.performLogin();
    await transactionPage.createNewTransactionRequest();
    // Add assertions to verify successful user info edit
    const actualText = await loginPage.getText(transactionPage.successMessageField);
    expect(actualText).includes(transactionPage.transactionData.success, "Transaction request was not successful");

  });
});