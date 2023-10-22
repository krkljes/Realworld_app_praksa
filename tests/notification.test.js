const DriverFactory = require('../utils/DriverFactory');
const NotificationPage = require('../pages/NotificationPage');
const LoginPage = require('../pages/LoginPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');
const screenshotDir = "./screenshots";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Notification test', function () {
  let driver;
  let loginPage;
  let notificationPage;

  beforeEach(async function () {
    // Initialize the WebDriver and open the browser
    const browserName = global.browserName || process.env.BROWSER_NAME || 'chrome'; //Browser choice - chrome, firefox, edge
    driver = DriverFactory.createDriver(browserName);
    loginPage = new LoginPage(driver);
    notificationPage = new NotificationPage(driver);
  });

   // After each test case, check if it failed and take a screenshot
   afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await notificationPage.takeScreenshot(this.currentTest.title, screenshotDir);
    }
   });
  
  afterEach(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Successful Notification Dismissal Test', async function () {
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
      await notificationPage.waitForElementToBeVisible(notificationPage.notificationCount);
      const updatedValue = parseInt(await notificationPage.getText(notificationPage.notificationCount), 10);
      // Add assertions to verify successful dismissal
      expect(updatedValue).to.equal(initialValue - 1);
    }

    // Additional context
    addContext(this, 'Test Case Title: Successful Notification Dismissal Test');
    addContext(this, 'Test Case Description: Verify that a user can successfully dismiss a notification');
    // Test Steps:
    addContext(this, 'Step 1: Open the web browser');
    addContext(this, 'Step 2: Navigate to the login page (' + loginPage.loginUrl + ')');
    addContext(this, 'Step 3: Enter a valid username (' + loginPage.username + ') in the username input field');
    addContext(this, 'Step 4: Enter a valid password (' + loginPage.password + ') in the password input field');
    addContext(this, 'Step 5: Click the "SIGN IN" button');
    addContext(this, 'Step 6: Wait for the URL to match (' + loginPage.baseUrl + ')');
    addContext(this, 'Step 7: Click on the "Notifications" button to access the notifications page');
    addContext(this, 'Step 8: Click on the "DISMISS" button next to a notification');
    addContext(this, 'Step 9: Verify that the notification counter number was reduced by 1');
  });
});
