// Import necessary modules and classes
const { Builder } = require("selenium-webdriver");
const UserSettingsPage = require("../pages/UserSettingsPage");
const LoginPage = require("../pages/LoginPage");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { describe, it, before, after } = require("mocha");
const screenshotDir = "./screenshots";

// Use Chai with Chai as Promised for assertions
chai.use(chaiAsPromised);
const expect = chai.expect;

// Describe a test suite for Sign Up
describe("Login test", async function () {
  let driver;
  let loginPage;
  let userSettingsPage;

  // Before running the test suite, set up the WebDriver and pages
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    userSettingsPage = new UserSettingsPage(driver);
    loginPage = new LoginPage(driver);
  });

  // After each test case, check if it failed and take a screenshot
  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await userSettingsPage.takeScreenshot(
        this.currentTest.title,
        screenshotDir
      );
    }
  });

  // Test case: Validate a failed log-in with an invalid username or password
  it("User settings change test", async function () {
    await loginPage.logIn();
    await userSettingsPage.changeUserInfo();

    const errorMessageElement = await driver.findElement(
      userSettingsPage.nameText
    );

    await userSettingsPage.expectTextToEqual(
      errorMessageElement,
      "Jeff B",
      5000
    );
  });

  // After running the test suite, quit the WebDriver
  after(async function () {
    await driver.quit();
  });
});
