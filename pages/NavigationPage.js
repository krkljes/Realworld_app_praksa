const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const locators = require('../utils/locators.json');
const urls = require('../utils/urls.json');

const navigation = locators.navigation;
const url = urls.url;

class NavigationPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = url;
    this.everyoneButton = By.css(navigation.everyoneButton);
    this.friendsButton = By.css(navigation.friendsButton);
    this.mineButton = By.css(navigation.mineButton);
    this.profileButton = By.css(navigation.profileButton);
    this.accountButton = By.css(navigation.accountButton);
    this.notificationsButton = By.css(navigation.notificationsButton);
    this.logoutButton = By.css(navigation.logoutButton);
  }

  // Method to navigate through website
  async navigate() {
    await this.click(this.everyoneButton);
    await this.waitForUrlToMatch(this.url.baseUrl);
    await this.click(this.friendsButton);
    await this.waitForUrlToMatch(this.url.contactsTransactionsUrl);
    await this.click(this.mineButton);
    await this.waitForUrlToMatch(this.url.personalTransactionsUrl);
    await this.click(this.profileButton);
    await this.waitForUrlToMatch(this.url.profileUrl);
    await this.click(this.accountButton);
    await this.waitForUrlToMatch(this.url.accountsUrl);
    await this.click(this.notificationsButton);
    await this.waitForUrlToMatch(this.url.notificationsUrl);
    await this.click(this.logoutButton);
    await this.waitForUrlToMatch(this.url.loginUrl);
  }

}

module.exports = NavigationPage;
