const { Builder, By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const credentials = require('../config/credentials.json');
const locators = require('../config/locators.json');
const urls = require('../config/urls.json');

const validUser = credentials.validUser;
const invalidUser = credentials.invalidUser;
const login = locators.login;
const url = urls.url;

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.loginUrl = url.loginUrl;
    this.baseUrl = url.baseUrl;
    this.usernameField = By.css(login.usernameField);
    this.passwordField = By.css(login.passwordField);
    this.loginButton = By.css(login.submitButton);
    this.errorField = By.css(login.errorMessageField);
    this.errorMsg = login.errorMessage;
  }

  async performLogin() {
    await this.navigateTo(this.loginUrl);
    await this.sendKeys(this.usernameField, validUser.username);
    await this.sendKeys(this.passwordField, validUser.password);
    await this.click(this.loginButton);
    await this.waitForUrlToMatch(this.baseUrl);
  }

  async tryInvalidLogin() {
    await this.navigateTo(this.loginUrl);
    await this.sendKeys(this.usernameField, invalidUser.username);
    await this.sendKeys(this.passwordField, invalidUser.password);
    await this.click(this.loginButton);
  }

}

module.exports = LoginPage;
