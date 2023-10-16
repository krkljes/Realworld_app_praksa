const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const locators = require('../config/locators.json');
const urls = require('../config/urls.json');

const navigation = locators.navigation;
const notification = locators.notification;
const url = urls.url;

class NotificationPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = url;
    this.notificationsButton = By.css(navigation.notificationsButton);
    this.notificationListItem = By.css(notification.listItem);
    this.notificationDismissButton = By.css(notification.dismissButton);
    this.notificationCount = By.css(notification.count);
  }

  // Method to dismiss a notification
  async dismissNotification() {
    await this.click(this.notificationsButton);
    await this.waitForUrlToMatch(this.url.notificationsUrl);
    const listItems = await this.driver.findElements(this.notificationListItem); // Find all list items
    for (const listItem of listItems) {
      const associatedText = await listItem.getText(); // Get the text associated with the current list item
      if (associatedText.includes("a")) { // Check if the text includes the target name
        const dismissButtons = await listItem.findElements(this.notificationDismissButton); // Find all dismiss buttons within the list item
        if (dismissButtons.length > 0) { // Check if dismiss buttons exist
          const dismissButton = await listItem.findElement(this.notificationDismissButton); // Get the first dismiss button
          await dismissButton.click(); // Click the dismiss button
          return; // Exit the loop
        }
      }
    }
  }

}

module.exports = NotificationPage;
