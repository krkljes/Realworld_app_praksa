const { Builder, By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const credentials = require('../config/credentials.json');
const locators = require('../config/locators.json');
const urls = require('../config/urls.json');

const validSignup1 = credentials.validSignups.signup1;
const invalidSignup1 = credentials.invalidSignups.signup1;
const url = urls.url;
const signUp = locators.signUp;

class SignUpPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.signUpUrl = url.signUpUrl;
    this.loginUrl = url.loginUrl;
    this.firstName = By.css(signUp.firstName);
    this.lastName = By.css(signUp.lastName);
    this.username = By.css(signUp.username);
    this.password = By.css(signUp.password);
    this.confirmPass = By.css(signUp.confirmPassword);
    this.singUpBtn = By.css(signUp.signUpButton);
  }

  async performSignUp() {
    await this.navigateTo(this.signUpUrl);
    await this.sendKeys(this.firstName, validSignup1.firstName);
    await this.sendKeys(this.lastName, validSignup1.lastName);
    await this.sendKeys(this.username, validSignup1.username);
    await this.sendKeys(this.password, validSignup1.password);
    await this.sendKeys(this.confirmPass, validSignup1.confirmPassword);
    await this.click(this.singUpBtn);
    await this.waitForUrlToMatch(this.loginUrl);
  }

  async tryInvalidSignUp() {
    await this.navigateTo(this.signUpUrl);
    await this.sendKeys(this.firstName, invalidSignup1.firstName);
    await this.sendKeys(this.lastName, invalidSignup1.lastName);
    await this.sendKeys(this.username, invalidSignup1.username);
    await this.sendKeys(this.password, invalidSignup1.password);
    await this.sendKeys(this.confirmPass, invalidSignup1.confirmPassword);
  }

}

module.exports = SignUpPage;
