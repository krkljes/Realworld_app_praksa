const { Builder, until } = require('selenium-webdriver');
const NotificationPage = require('../pages/NotificationPage');
const LoginPage = require('../pages/LoginPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Notification test', function () {
  let driver;

  before(async function () {
    // Initialize the WebDriver and open the browser
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Dismissing a Notification Test', async function () {
    const loginPage = new LoginPage(driver);
    const notificationPage = new NotificationPage(driver);
    
    // Perform login
    await loginPage.performLogin();
    // Get the initial value
    await notificationPage.waitForElementToBeVisible(notificationPage.notificationCount);
    const initialValue = parseInt(await notificationPage.getText(notificationPage.notificationCount), 10);

    // If the initial value is 0, consider the test passed
    if (initialValue === 0) {
      console.log('Test passed because there are no notifications.');
    } else {
      // Dismiss a notification
      await notificationPage.dismissNotification();
      // Get the updated value
      const updatedValue = parseInt(await notificationPage.getText(notificationPage.notificationCount), 10); 
      // Add assertions to verify successful dismissal
      expect(updatedValue).to.equal(initialValue - 1);
    }
  });
});
