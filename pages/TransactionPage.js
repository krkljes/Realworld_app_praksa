const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const credentials = require('../utils/credentials.json');
const locators = require('../utils/locators.json');
const urls = require('../utils/urls.json');

const transactionData = credentials.transaction;
const transactionLocatorator = locators.transactions;
const url = urls.url;

class TransactionPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = url;
    this.transactionData = transactionData;
    this.newTransactionButton = By.css(transactionLocatorator.newTransactionButton);
    this.userList = By.css(transactionLocatorator.userList);
    this.userItem = By.css(transactionLocatorator.userItem);
    this.amountField = By.css(transactionLocatorator.amount);
    this.noteField = By.css(transactionLocatorator.note);
    this.payButton = By.css(transactionLocatorator.pay);
    this.requestButton = By.css(transactionLocatorator.request);
    this.successMessageField = By.css(transactionLocatorator.successMessage);
  }

  // Method to create a new payment
  async createNewPayment() {
    await this.click(this.newTransactionButton);
    await this.clickRandomUserInList(this.userItem);
    await this.sendKeys(this.amountField, this.transactionData.amount);
    await this.sendKeys(this.noteField, this.transactionData.note);
    await this.click(this.payButton);
  }

  // Method to create a new transaction request
  async createNewTransactionRequest() {
    await this.click(this.newTransactionButton);
    await this.clickRandomUserInList(this.userItem);
    await this.sendKeys(this.amountField, this.transactionData.amount);
    await this.sendKeys(this.noteField, this.transactionData.note);
    await this.click(this.requestButton);
  }
}
module.exports = TransactionPage;
