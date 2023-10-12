const { Builder } = require('selenium-webdriver');
const AccountPage = require('../pages/AccountPage');
const LoginPage = require('../pages/LoginPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');

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
    // Add assertions to verify successful account creation
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(accountPage.accountsUrl, "Account creation failed");

    //Additional context
    addContext(this, `Found the url ${loginPage.loginUrl}`);
    addContext(this, `Filled the username ${loginPage.username}`);
    addContext(this, `Filled the password ${loginPage.password}`);
    addContext(this, `Clicked on the button ${loginPage.loginButton}`);
    addContext(this, `The url matched ${loginPage.baseUrl}`);
    addContext(this, `Clicked on the button ${accountPage.accountBtn}`);
    addContext(this, `Clicked on the button ${accountPage.createAccBtn}`);
    addContext(this, `Created a dynamic bank name`);
    addContext(this, `Created a routing number ${accountPage.account.routingNumber}`);
    addContext(this, `Created an account number ${accountPage.account.accountNumber}`);
    addContext(this, `Clicked on the button ${accountPage.saveAccBtn}`);
  });

  it('Delete account test', async function () {
    const loginPage = new LoginPage(driver);
    const accountPage = new AccountPage(driver);
    // Perform login
    await loginPage.performLogin();
    // Delete account
    await accountPage.findAndClickDeleteButtonByText();
    // Add assertions to verify successful deletion
    expect(accountPage.verifyText).to.satisfy((text) => {
      return text.includes("(Deleted)") || text.includes("DELETE");
    }, 'Associated text does not meet the expected conditions.');

    //Additional context
    addContext(this, `Found the url ${loginPage.loginUrl}`);
    addContext(this, `Filled the username ${loginPage.username}`);
    addContext(this, `Filled the password ${loginPage.password}`);
    addContext(this, `Clicked on the button ${loginPage.loginButton}`);
    addContext(this, `The url matched ${loginPage.baseUrl}`);
    addContext(this, `Clicked on the button ${accountPage.accountBtn}`);
    addContext(this, `Clicked on the button ${accountPage.createAccBtn}`);
    addContext(this, `Found the field that matches the account name ${accountPage.accountName}`);
    addContext(this, `Located the delete button that matches the account name field ${accountPage.delAccBtn}`);
    addContext(this, `Clicked on the button ${accountPage.delAccBtn}`);
  });

});
