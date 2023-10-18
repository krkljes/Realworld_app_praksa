const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const credentials = require('../utils/credentials.json');
const locators = require('../utils/locators.json');
const urls = require('../utils/urls.json');

const validSignup1 = credentials.validSignups.signup1;
const invalidSignup1 = credentials.invalidSignups.signup1;
const url = urls.url;
const signUp = locators.signUp;

class SignUpPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.signUpUrl = url.signUpUrl;
    this.loginUrl = url.loginUrl;
    this.baseUrl = url.baseUrl;
    this.validSignup = validSignup1;
    this.invalidSignup = invalidSignup1;
    this.firstName = By.css(signUp.firstName);
    this.lastName = By.css(signUp.lastName);
    this.username = By.css(signUp.username);
    this.password = By.css(signUp.password);
    this.confirmPass = By.css(signUp.confirmPassword);
    this.singUpBtn = By.css(signUp.signUpButton);
  }

  // Method to perform a sign-up operation with valid data
  async performSignUp() {
    await this.navigateTo(this.signUpUrl);
    await this.sendKeys(this.firstName, this.validSignup.firstName);
    await this.sendKeys(this.lastName, this.validSignup.lastName);
    await this.sendKeys(this.username, this.validSignup.username);
    await this.sendKeys(this.password, this.validSignup.password);
    await this.sendKeys(this.confirmPass, this.validSignup.confirmPassword);
    await this.click(this.singUpBtn);
    await this.waitForUrlToMatch(this.loginUrl);
  }

  // Method to simulate an invalid sign-up attempt
  async tryInvalidSignUp() {
    await this.navigateTo(this.signUpUrl);
    await this.sendKeys(this.firstName, this.invalidSignup.firstName);
    await this.sendKeys(this.lastName, this.invalidSignup.lastName);
    await this.sendKeys(this.username, this.invalidSignup.username);
    await this.sendKeys(this.password, this.invalidSignup.password);
    await this.sendKeys(this.confirmPass, this.invalidSignup.confirmPassword);
  }
}

module.exports = SignUpPage;
