const { Builder, By } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const assert = chai.assert;

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

  it('should log in successfully', async function () {
    const loginPage = new LoginPage(driver);

    // Perform login
    await loginPage.performLogin();

    // Add assertions to verify successful login
    const currentUrl = await driver.getCurrentUrl();

    assert.isTrue(currentUrl === 'http://localhost:3000/', 'Login was not successful');

  });
});
