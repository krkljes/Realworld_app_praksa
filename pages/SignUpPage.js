const { Builder, By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const testData = require('../config/testdata.json');

const validSignup1 = testData.validSignups.signup1;
const invalidSignup1 = testData.invalidSignups.signup1;
const urls = testData.urls;
const signUp = testData.signUp;

class SignUpPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.signUpUrl = urls.signUpUrl;
    this.loginUrl = urls.loginUrl;
    this.firstName = By.id(signUp.firstName);
    this.lastName = By.id(signUp.lastName);
    this.username = By.id(signUp.username);
    this.password = By.id(signUp.password);
    this.confirmPass = By.id(signUp.confirmPassword);
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
    await this.driver.wait(until.urlIs(this.loginUrl), 1000);
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
