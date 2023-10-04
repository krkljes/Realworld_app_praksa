const { Builder, By } = require('selenium-webdriver');
const SignUpPage = require('../pages/SignUpPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('SignUp Test', function () {
  let driver;

  before(async function () {
    // Initialize the WebDriver and open the browser
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('should sign up successfully', async function () {
    const signUpPage = new SignUpPage(driver);

    // Perform signup
    await signUpPage.performSignUp();

    // Add assertions to verify successful signup
    const currentUrl = await driver.getCurrentUrl();

    assert.isTrue(currentUrl === signUpPage.loginUrl, 'Sign up was not successful');

  });

  it('signup button should be disabled', async function () {
    const signUpPage = new SignUpPage(driver);

    // Perform signup
    await signUpPage.tryInvalidSignUp();

    // Add assertions to verify successful signup
    const signUpButton = await driver.findElement(signUpPage.singUpBtn);
    assert.isTrue(await signUpButton.getAttribute('disabled') === 'true',
    'Signup button is not disabled for invalid signup');
   
  });
});
