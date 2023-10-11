const { until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

// Method to navigate to a specified URL
async navigateTo(url) {
  await this.driver.get(url); // Use the WebDriver to navigate to the given URL
}

// Method to click on an element located by a provided locator
async click(locator) {
  const element = await this.driver.wait(until.elementLocated(locator), 1000); // Wait for the element to be located
  await this.driver.wait(until.elementIsEnabled(element), 1000); // Wait for the element to become enabled
  await element.click(); // Click on the element
}

// Method to send a sequence of characters to an element located by a provided locator
async sendKeys(locator, characters) {
  await this.driver.wait(until.elementLocated(locator), 1000); // Wait for the element to be located
  await this.driver.findElement(locator).sendKeys(characters); // Send the provided characters to the element
}

// Method to wait for the URL to match an expected URL within a specified timeout
async waitForUrlToMatch(expectedUrl, timeout = 1000) {
  await this.driver.wait(until.urlIs(expectedUrl), timeout).catch((error) => {
      console.error(`Timeout: URL did not match expected URL (${expectedUrl}) within the specified time.`);
      throw error; // Handle a timeout error if the URL doesn't match the expected URL
  });
}

// Method to get the current timestamp as a string
getCurrentTimestamp() {
  return Date.now().toString(); // Get the current timestamp and convert it to a string
}

  
}

module.exports = BasePage;
