const { Builder, By, until } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Login Test', function () {
  let driver;

  before(async function () {
    // Initialize the WebDriver and open the browser
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Invalid login test', async function () {
    const loginPage = new LoginPage(driver);

    // Perform login
    await loginPage.tryInvalidLogin();

    // Add assertions to verify successful login
    const errorMessage = driver.wait(until.elementLocated(loginPage.errorField),2000);
    const errorText = await errorMessage.getText();
    expect(errorText).to.equal(loginPage.errorMsg);

  });

  it('Valid login test', async function () {
    const loginPage = new LoginPage(driver);

    // Perform login
    await loginPage.performLogin();

    // Add assertions to verify successful login
    const currentUrl = await driver.getCurrentUrl();

    expect(currentUrl).to.equal(loginPage.baseUrl, "Log in was not successful");

  });

});
