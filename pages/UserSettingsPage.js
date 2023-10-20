const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const urldata = require("../config/urldata.json");
const credentials = require("../config/credentials.json");
const locators = require("../config/locators.json");

// Accessing test data
const userSettings = credentials.userSettingsInputs;
const url = urldata.urls;
const userSettingsLocators = locators.myAccount;

class UserSettingsPage extends BasePage {
  // Locators and methods specific to the Login page
  constructor(driver) {
    super(driver);
    this.userSettingsUrl = url.userSettingsUrl;
    this.firstName = By.css(userSettingsLocators.firstName);
    this.lastName = By.css(userSettingsLocators.lastName);
    this.email = By.css(userSettingsLocators.email);
    this.phoneNum = By.css(userSettingsLocators.phoneNum);
    this.saveBtn = By.css(userSettingsLocators.saveBtn);
    this.myAccBtn = By.css(userSettingsLocators.myAccBtn);
    this.nameText = By.css(userSettingsLocators.nameText);
  }

  async changeUserInfo() {
    await this.clickBtn(this.myAccBtn);
    await this.waitForUrl(this.userSettingsUrl);

    await this.waitForElementVisible(this.firstName);
    await this.clearInputField(this.firstName);
    await this.sendKeys(this.firstName, userSettings.firstName);

    await this.waitForElementVisible(this.lastName);
    await this.clearInputField(this.lastName);
    await this.sendKeys(this.lastName, userSettings.lastName);

    await this.waitForElementVisible(this.email);
    await this.clearInputField(this.email);
    await this.sendKeys(this.email, userSettings.email);

    await this.waitForElementVisible(this.phoneNum);
    await this.clearInputField(this.phoneNum);
    await this.sendKeys(this.phoneNum, userSettings.phoneNumber);

    await this.clickBtn(this.saveBtn);
  }
}
module.exports = UserSettingsPage;
