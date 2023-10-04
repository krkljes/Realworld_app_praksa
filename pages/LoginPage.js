const { Builder, By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const testData = require('../config/testdata.json');

const validUser = testData.validUser;
const urls = testData.urls;
const login = testData.login;

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.loginUrl = urls.loginUrl;
    this.usernameField = By.id(login.usernameField);
    this.passwordField = By.id(login.passwordField);
    this.loginButton = By.css(login.submitButton);
  }

  async performLogin() {
    await this.navigateTo(this.loginUrl);
    await this.sleep(2);
    await this.sendKeys(this.usernameField, validUser.username);
    await this.sleep(2);
    await this.sendKeys(this.passwordField, validUser.password);
    await this.sleep(2);
    await this.click(this.loginButton);
    await this.sleep(2);
  }

}

module.exports = LoginPage;
