// Import necessary modules and classes
const { Builder } = require("selenium-webdriver");
const TransactionPage = require("../pages/TransactionPage");
const LoginPage = require("../pages/LoginPage");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { describe, it, before, after } = require("mocha");
const screenshotDir = "./screenshots";

// Use Chai with Chai as Promised for assertions
chai.use(chaiAsPromised);
const expect = chai.expect;

// Describe a test suite for new transaction
describe("Transactions test", async function () {
  let driver;
  let transactionPage;
  let loginPage;

  // Before running the test suite, set up the WebDriver and pages
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    transactionPage = new TransactionPage(driver);
    loginPage = new LoginPage(driver);
  });

  // After each test case, check if it failed and take a screenshot
  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await transactionPage.takeScreenshot(
        this.currentTest.title,
        screenshotDir
      );
    }
  });

  // Test case: Validate successful transaction
  it("Payment transaction test", async function () {
    await loginPage.logIn();
    await transactionPage.payTransaction();

    const errorMessageElement = await driver.findElement(
      transactionPage.alertText
    );

    await transactionPage.expectTextToEqual(
      errorMessageElement,
      "Transaction Submitted!",
      5000
    );
  });

  it("Request transaction test", async function () {
    await transactionPage.requestTransaction();

    const errorMessageElement = await driver.findElement(
      transactionPage.alertText
    );

    await transactionPage.expectTextToEqual(
      errorMessageElement,
      "Transaction Submitted!",
      5000
    );
  });

  // After running the test suite, quit the WebDriver
  after(async function () {
    await driver.quit();
  });
});
