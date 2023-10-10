const { Builder, By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const credentials = require('../config/credentials.json');
const locators = require('../config/locators.json');
const urls = require('../config/urls.json');

const account = credentials.account;
const accountLocator = locators.account;
const url = urls.url;

class AccountPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.accountsUrl = url.accountsUrl;
    this.accountBtn = By.css(accountLocator.accountButton);
    this.createAccBtn = By.css(accountLocator.createAccount);
    this.bankName = By.css(accountLocator.bankName);
    this.routingNum = By.css(accountLocator.routingNumber);
    this.accountNum = By.css(accountLocator.accountNumber);
    this.saveAccBtn = By.css(accountLocator.saveAccountButton);
    this.bankAccListItem = By.css(accountLocator.bankAccListItem);
    this.delAccBtn = By.css(accountLocator.deleteAccountButton);
    this.accountName = account.bankName;
    this.textext;
  }

  async createBankAccount() {
    await this.click(this.accountBtn);
    await this.click(this.createAccBtn);
    await this.sendKeys(this.bankName, Date.now().toString());
    await this.sendKeys(this.routingNum, account.routingNumber);
    await this.sendKeys(this.accountNum, account.accountNumber);
    await this.click(this.saveAccBtn);
  }


  async findAndClickDeleteButtonByText() {
    await this.click(this.accountBtn);
    const listItems = await this.driver.findElements(this.bankAccListItem);
    for (const listItem of listItems) {
      const associatedText = await listItem.getText();
      if (associatedText.includes(this.accountName)) {
        this.verifyText = associatedText;
        const deleteButtons = await listItem.findElements(this.delAccBtn);
        if (deleteButtons.length > 0) {
          const deleteButton = await listItem.findElement(this.delAccBtn);
          await deleteButton.click();
          return;
        }
      }
    }
  }
}
module.exports = AccountPage;
