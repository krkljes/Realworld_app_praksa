const { Builder, until } = require('selenium-webdriver');
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
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Valid login test', async function () {
    const loginPage = new LoginPage(driver);

    // Perform login
    await loginPage.performLogin();
    // Add assertions to verify successful login
    const currentUrl = await driver.getCurrentUrl();
    
    expect(currentUrl).to.equal(loginPage.baseUrl, "Log in was not successful");

    //Additional context
    addContext(this, `Found the url ${loginPage.loginUrl}`);
    addContext(this, `Filled the username ${loginPage.username}`);
    addContext(this, `Filled the password ${loginPage.password}`);
    addContext(this, `Clicked on the button ${loginPage.loginButton}`);
    addContext(this, `The url matched ${loginPage.baseUrl}`);
  });

  it('Invalid login test', async function () {
    const loginPage = new LoginPage(driver);

    // Try to login with invalid credentials
    await loginPage.tryInvalidLogin();

    // Add assertions to verify the login failed
    const errorMessage = driver.wait(until.elementLocated(loginPage.errorField),2000);
    const errorText = await errorMessage.getText();
    expect(errorText).to.equal(loginPage.errorMsg, "Invalid login test failed");

    //Additional context
    addContext(this, `Found the url ${loginPage.loginUrl}`);
    addContext(this, `Filled the username ${loginPage.invalidUsername}`);
    addContext(this, `Filled the password ${loginPage.invalidPassword}`);
    addContext(this, `Clicked on the button ${loginPage.loginButton}`);
    addContext(this, `Received error message ${errorText}`);
  });

});
