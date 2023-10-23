const DriverFactory = require('../utils/DriverFactory');
const SignUpPage = require('../pages/SignUpPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const addContext = require('mochawesome/addContext');

chai.use(chaiAsPromised);
const expect = chai.expect;
const credentials = require('../utils/credentials.json');

describe('Signup Process Tests', function () {
  let driver;

  beforeEach(async function () {
    // Initialize the WebDriver and open the browser
    const browserName = global.browserName || process.env.BROWSER_NAME || 'chrome'; //Browser choice - chrome, firefox, edge
    driver = DriverFactory.createDriver(browserName);
  });

  afterEach(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  for (const signupKey in credentials.validSignups) {
    if (credentials.validSignups.hasOwnProperty(signupKey)) {
      it(`Successful Signup Process Test - ${signupKey}`, async function () {
        const signUpPage = new SignUpPage(driver);
        const signupData = credentials.validSignups[signupKey];

        // Perform signup with the data from credentials.json
        await signUpPage.performSignUp(signupData);

        // Add assertions to verify successful signup
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal(signUpPage.loginUrl, "Sign up was not successful");

        // Additional context
        addContext(this, 'Test Case Title: Successful Signup Process Test');
        // Add more context as needed
      });
    }
  }

  for (const signupKey in credentials.invalidSignups) {
    if (credentials.invalidSignups.hasOwnProperty(signupKey)) {
      it(`Unsuccessful Signup Process Test - ${signupKey}`, async function () {
        const signUpPage = new SignUpPage(driver);
        const signupData = credentials.invalidSignups[signupKey];

        // Try to signup with invalid credentials
        await signUpPage.tryInvalidSignUp(signupData);

        // Add assertions to verify the signup failed
        const signUpButton = await driver.findElement(signUpPage.singUpBtn);
        expect(await signUpButton.getAttribute('disabled')).to.equal('true', 'Signup button is not disabled for invalid signup');

        // Additional context
        addContext(this, 'Test Case Title: Unsuccessful Signup Process Test');
        // Add more context as needed
      });
    }
  }
});
