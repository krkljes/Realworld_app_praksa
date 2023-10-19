const DriverFactory = require('../utils/DriverFactory');
const LoginPage = require('../pages/LoginPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Login Tests', function () {
  let driver;

  beforeEach(async function () {
    // Initialize the WebDriver and open the browser
    const browserName = global.browserName || process.env.BROWSER_NAME || 'chrome'; //Browser choice - chrome, firefox, edge
    driver = DriverFactory.createDriver(browserName);
  });

  afterEach(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Successful Login Process Test', async function () {
    const loginPage = new LoginPage(driver);

    // Perform login
    await loginPage.performLogin();
    // Add assertions to verify successful Login
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(loginPage.baseUrl, "Login was not successful");

    // Additional context
    addContext(this, 'Test Case Title: Successful Login Process Test');
    addContext(this, 'Test Case Description: Verify that a user can successfully log in into an account on the website');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the login page (' + loginPage.loginUrl + ')');
    addContext(this, 'Step 3: Enter a valid username (' + loginPage.username + ') in the username input field');
    addContext(this, 'Step 4: Enter a valid password (' + loginPage.password + ') in the password input field');
    addContext(this, 'Step 5: Click on the "SIGN IN" button');
    addContext(this, 'Step 6: Wait for the URL to match (' + loginPage.baseUrl + ')');
  });

  it('Unsuccessful Login Process Test', async function () {
    const loginPage = new LoginPage(driver);

    // Try to login with invalid credentials
    await loginPage.tryInvalidLogin();

    // Add assertions to verify the Login failed
    const errorText = await loginPage.getText(loginPage.errorField);
    expect(errorText).to.equal(loginPage.errorMsg, "Unsuccessful Login Process Test failed");

    // Additional context
    addContext(this, 'Test Case Title: Unsuccessful Login Process Test');
    addContext(this, 'Test Case Description: Verify that the login process fails when a user attempts to log in with invalid or incorrect information on the website.');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the login page (' + loginPage.loginUrl + ')');
    addContext(this, 'Step 3: Enter a valid username (' + loginPage.username + ') in the username input field');
    addContext(this, 'Step 4: Enter a valid password (' + loginPage.password + ') in the password input field');
    addContext(this, 'Step 5: Click on the "SIGN IN" button');
    addContext(this, 'Step 6: Error message is displayed (' + errorText + ')');
  });
});
