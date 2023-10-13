const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');
const UserInfoPage = require('../pages/UserInfoPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('User Info Edit Tests', function () {
  let driver;

  before(async function () {
    // Initialize the WebDriver and open the browser
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Successful User Info Edit Test', async function () {
    const loginPage = new LoginPage(driver);
    const userInfoPage = new UserInfoPage(driver);

    // Perform login
    await loginPage.performLogin();
    await userInfoPage.editUserInfo();
    // Add assertions to verify successful user info edit
    const actualText = await loginPage.getText(userInfoPage.userFullName);
    expect(actualText).includes(userInfoPage.userCredentials.firstName, "User info edit was not successful");

  });

});
