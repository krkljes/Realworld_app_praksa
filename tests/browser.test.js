const { Builder } = require('selenium-webdriver');
const { Options: FirefoxOptions } = require('selenium-webdriver/firefox');
const { Options: EdgeOptions } = require('selenium-webdriver/edge');
const LoginPage = require('../pages/LoginPage');
const NavigationPage = require('../pages/NavigationPage');
const TransactionPage = require('../pages/TransactionPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

const browsers = [
  { name: 'firefox', options: new FirefoxOptions() },
  { name: 'MicrosoftEdge', options: new EdgeOptions() }
];

browsers.forEach(browserConfig => {
  describe(`Browser test in ${browserConfig.name}`, function () {
    let driver;

    before(async function () {
      // Initialize the WebDriver and open the specified browser
      driver = await new Builder()
        .forBrowser(browserConfig.name)
        .setFirefoxOptions(browserConfig.options)
        .setEdgeOptions(browserConfig.options)
        .build();
    });

    after(async function () {
      // Quit the WebDriver after the test is complete
      await driver.quit();
    });

    it('Successful Navigation Test', async function () {
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
    it('Successful Payment Test', async function () {
      const loginPage = new LoginPage(driver);
      const transactionPage = new TransactionPage(driver);
  
      // Perform login
      await loginPage.performLogin();
      await transactionPage.createNewPayment();
      // Add assertions to verify successful user info edit
      const actualText = await loginPage.getText(transactionPage.successMessageField);
      expect(actualText).includes(transactionPage.transactionData.success, "Payment was not successful");
  
    });
  });
});
