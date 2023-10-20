// Import necessary modules and classes
const { Builder } = require("selenium-webdriver");
const SignUpPage = require("../pages/SignUpPage");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { describe, it, before, after } = require("mocha");

// Use Chai with Chai as Promised for assertions
chai.use(chaiAsPromised);
const assert = chai.assert;

// Describe a test suite for Sign Up
describe("Sign Up test", function () {
  let driver;
  let signUpPage;

  // Before running the test suite, set up the WebDriver and pages
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    signUpPage = new SignUpPage(driver);
  });

  // After each test case, check if it failed and take a screenshot
  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await signUpPage.takeScreenshot(this.currentTest.title, "./screenshots");
    }
  });

  // Test case: Validate a successful sign-up
  it("Validate SignUp success", async function () {
    await signUpPage.signUp();

    const currentUrl = await driver.getCurrentUrl();
    assert.isTrue(
      currentUrl === signUpPage.loginUrl,
      "Sign up was not successful"
    );
  });

  // Test case: Validate an unsuccessful sign-up
  it("Validate SignUp fail", async function () {
    await signUpPage.invalidSignUp();

    const button = await driver.findElement(signUpPage.btn);
    assert.isTrue(
      (await button.getAttribute("disabled")) === "true",
      "Button is not disabled"
    );
  });

  // After running the test suite, quit the WebDriver
  after(async function () {
    await driver.quit();
  });
});
