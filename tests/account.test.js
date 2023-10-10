const { Builder, By, until } = require('selenium-webdriver');
const AccountPage = require('../pages/AccountPage');
const LoginPage = require('../pages/LoginPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Account tests', function () {
  let driver;

  beforeEach(async function () {
    // Initialize the WebDriver and open the browser
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Create account test', async function () {
    const loginPage = new LoginPage(driver);
    const accountPage = new AccountPage(driver);
    // Perform login
    await loginPage.performLogin();
    // Create account
    await accountPage.createBankAccount();
    // Add assertions to verify successful login
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(accountPage.accountsUrl, "Account creation failed");
  });

  it('Delete account test', async function () {
    const loginPage = new LoginPage(driver);
    const accountPage = new AccountPage(driver);
    // Perform login
    await loginPage.performLogin();
    // Create account
    await accountPage.findAndClickDeleteButtonByText();
    // Add assertions to verify successful login
    expect(accountPage.verifyText).to.satisfy((text) => {
      return text.includes("(Deleted)") || text.includes("DELETE");
    }, 'Associated text does not meet the expected conditions.');
  });

});
