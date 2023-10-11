const { Builder } = require('selenium-webdriver');
const SignUpPage = require('../pages/SignUpPage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('SignUp Tests', function () {
  let driver;

  before(async function () {
    // Initialize the WebDriver and open the browser
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // Quit the WebDriver after the test is complete
    await driver.quit();
  });

  it('Valid signup test', async function () {
    const signUpPage = new SignUpPage(driver);

    // Perform signup
    await signUpPage.performSignUp();

    // Add assertions to verify successful signup
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(signUpPage.loginUrl, "Sign up was not successful");

  });

  it('Invalid signup test', async function () {
    const signUpPage = new SignUpPage(driver);

    // Try to signup with invalid credentials
    await signUpPage.tryInvalidSignUp();

    // Add assertions to verify the signup failed
    const signUpButton = await driver.findElement(signUpPage.singUpBtn);
    expect(await signUpButton.getAttribute('disabled')).to.equal('true', 'Signup button is not disabled for invalid signup');
    
  });
});
