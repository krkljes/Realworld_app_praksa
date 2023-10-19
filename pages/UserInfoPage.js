const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const credentials = require('../utils/credentials.json');
const locators = require('../utils/locators.json');
const urls = require('../utils/urls.json');

const userInfo = locators.userInfo;
const profileButton = locators.navigation.profileButton;
const url = urls.url;
const userCredentials = credentials.userInfo;

class UserInfoPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = url;
    this.userInfo = userInfo;
    this.userCredentials = userCredentials;
    this.profileButton = By.css(profileButton);
    this.firstNameField = By.css(userInfo.firstName);
    this.lastNameField = By.css(userInfo.lastName);
    this.emailField = By.css(userInfo.email);
    this.phoneField = By.css(userInfo.phone);
    this.userFullName = By.css(userInfo.userFullName);
    this.userSaveButton = By.css(userInfo.userSaveButton);
  }

  // Method to edit the user information
  async editUserInfo() {
    await this.click(this.profileButton);
    await this.waitForUrlToMatch(this.url.profileUrl);
    await this.clearInputField(this.firstNameField);
    await this.sendKeys(this.firstNameField, userCredentials.firstName);
    await this.clearInputField(this.lastNameField);
    await this.sendKeys(this.lastNameField, userCredentials.lastName);
    await this.clearInputField(this.emailField);
    await this.sendKeys(this.emailField, userCredentials.email);
    await this.clearInputField(this.phoneField);
    await this.sendKeys(this.phoneField, userCredentials.phone);
    await this.click(this.userSaveButton);
  }

}

module.exports = UserInfoPage;
