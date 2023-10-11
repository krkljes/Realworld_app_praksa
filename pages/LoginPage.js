const { By } = require('selenium-webdriver');
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
    this.username = validUser.username;
    this.password = validUser.password;
    this.invalidUsername = invalidUser.username;
    this.invalidPassword = invalidUser.password;
    this.loginButton = By.css(login.submitButton);
    this.errorField = By.css(login.errorMessageField);
    this.errorMsg = login.errorMessage;
  }

  // Method to perform a valid login
  async performLogin() {
    await this.navigateTo(this.loginUrl);
    await this.sendKeys(this.usernameField, this.username);
    await this.sendKeys(this.passwordField, this.password);
    await this.click(this.loginButton);
    await this.waitForUrlToMatch(this.baseUrl);
  }

  // Method to simulate an invalid login attempt
  async tryInvalidLogin() {
    await this.navigateTo(this.loginUrl);
    await this.sendKeys(this.usernameField, this.invalidUsername);
    await this.sendKeys(this.passwordField, this.invalidPassword);
    await this.click(this.loginButton);
  }
}

module.exports = LoginPage;
