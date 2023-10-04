const { Builder, By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const testData = require('../config/testdata.json');

const validUser = testData.validUser;
const invalidUser = testData.invalidUser;
const urls = testData.urls;
const login = testData.login;

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.loginUrl = urls.loginUrl;
    this.baseUrl = urls.baseUrl;
    this.usernameField = By.id(login.usernameField);
    this.passwordField = By.id(login.passwordField);
    this.loginButton = By.css(login.submitButton);
    this.logoutButton = By.css(login.logout);
    this.errorField = By.css(login.errorMessageField);
    this.errorMsg = login.errorMessage;
  }

  async performLogin() {
    await this.navigateTo(this.loginUrl);
    await this.sendKeys(this.usernameField, validUser.username);
    await this.sendKeys(this.passwordField, validUser.password);
    await this.click(this.loginButton);
    await this.driver.wait(until.urlIs(urls.baseUrl), 1000);
  }

  async tryInvalidLogin() {
    await this.navigateTo(this.loginUrl);
    await this.click(this.logoutButton);
    await this.sendKeys(this.usernameField, invalidUser.username);
    await this.sendKeys(this.passwordField, invalidUser.password);
    await this.click(this.loginButton);
  }

}

module.exports = LoginPage;
