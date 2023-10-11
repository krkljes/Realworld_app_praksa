const { By } = require('selenium-webdriver');
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
  }

  // Method to create a bank account
  async createBankAccount() {
    await this.click(this.accountBtn); // Click on the account button
    await this.click(this.createAccBtn); // Click on the "Create Account" button
    await this.sendKeys(this.bankName, Date.now().toString()); // Enter a dynamic bank name (timestamp)
    await this.sendKeys(this.routingNum, account.routingNumber); // Enter the routing number from the 'account' object
    await this.sendKeys(this.accountNum, account.accountNumber); // Enter the account number from the 'account' object
    await this.click(this.saveAccBtn); // Click the "Save Account" button
  }

  // Method to find and click the delete button associated with a specific text
  async findAndClickDeleteButtonByText() {
    await this.click(this.accountBtn); // Click on the account button
    const listItems = await this.driver.findElements(this.bankAccListItem); // Find all list items
    for (const listItem of listItems) {
      const associatedText = await listItem.getText(); // Get the text associated with the current list item
      if (associatedText.includes(this.accountName)) { // Check if the text includes the target account name
        this.verifyText = associatedText; // Store the associated text for verification
        const deleteButtons = await listItem.findElements(this.delAccBtn); // Find all delete buttons within the list item
        if (deleteButtons.length > 0) { // Check if delete buttons exist
          const deleteButton = await listItem.findElement(this.delAccBtn); // Get the first delete button
          await deleteButton.click(); // Click the delete button
          return; // Exit the loop
        }
      }
    }
  }
}
module.exports = AccountPage;
