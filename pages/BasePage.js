const { until, Key } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  // Method to navigate to a specified URL
  async navigateTo(url) {
    await this.driver.get(url); // Use the WebDriver to navigate to the given URL
  }

  // Method to click on an element located by a provided locator
  async click(locator, timeout = 1000) {
    const element = await this.driver.wait(until.elementLocated(locator), timeout); // Wait for the element to be located
    await this.driver.wait(until.elementIsEnabled(element), timeout); // Wait for the element to become enabled
    await element.click(); // Click on the element
  }

  // Method to send a sequence of characters to an element located by a provided locator
  async sendKeys(locator, characters, timeout = 1000) {
    await this.driver.wait(until.elementLocated(locator), timeout); // Wait for the element to be located
    await this.driver.findElement(locator).sendKeys(characters); // Send the provided characters to the element
  }

  // Method to wait for the URL to match an expected URL within a specified timeout
  async waitForUrlToMatch(expectedUrl, timeout = 1000) {
    await this.driver.wait(until.urlIs(expectedUrl), timeout).catch((error) => {
      console.error(`Timeout: URL did not match expected URL (${expectedUrl}) within the specified time.`);
      throw error; // Handle a timeout error if the URL doesn't match the expected URL
    });
  }

  // Method to wait for the element to become visible
  async waitForElementToBeVisible(selector, timeout = 1000) {
    const element = await this.driver.wait(until.elementIsVisible(this.driver.findElement(selector)), timeout);
    return element;
  }

  //Method to clear the selected input field
  async clearInputField(inputFieldLocator) {
    const inputField = await this.driver.findElement(inputFieldLocator);
    await inputField.sendKeys(Key.chord(Key.CONTROL, 'a')); // Select all text
    await inputField.sendKeys(Key.BACK_SPACE); // Delete the selected text
  }

  //Method to return the locator text
  async getText(elementLocator, timeout = 1000) {
    const element = await this.driver.wait(until.elementLocated(elementLocator), timeout);
    return element.getText();
  }

  // Method to click on a random user from a list
  async clickRandomUserInList(userListLocator) {
    const listItems = await this.driver.findElements(userListLocator); // Find all list items
    for (const listItem of listItems) {
      const associatedText = await listItem.getText(); // Get the text associated with the current list item
      if (associatedText.includes("Ibrahim Dickens")) { // Check if the text includes the target name
        await listItem.click(); // Click the button
        return; // Exit the loop
      }
    }
  }

  // Method to get the current timestamp as a string
  getCurrentTimestamp() {
    return Date.now().toString(); // Get the current timestamp and convert it to a string
  }

}

module.exports = BasePage;
