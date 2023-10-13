const { Builder } = require('selenium-webdriver');
const NavigationPage = require('../pages/NavigationPage');
const LoginPage = require('../pages/LoginPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Navigation test', function () {
  let driver;

  before(async function () {
    // Initialize the WebDriver and open the browser
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Step by step navigation test', async function () {
    const loginPage = new LoginPage(driver);
    const navigationPage = new NavigationPage(driver);
    // Perform login
    await loginPage.performLogin();
    // Navigate through website
    await navigationPage.navigate();
    // Add assertions to verify successful navigation
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(navigationPage.url.loginUrl, "Navigation failed");
  });

});
