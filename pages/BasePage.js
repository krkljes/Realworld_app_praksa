const { By, until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigateTo(url) {
    await this.driver.get(url);
  }

  async click(locator) {
    const element = await this.driver.wait(until.elementLocated(locator), 1000);
    await this.driver.wait(until.elementIsEnabled(element), 1000);
    await element.click();
  }

  async sendKeys(locator, characters) {
    await this.driver.wait(until.elementLocated(locator),1000);
    await this.driver.findElement(locator).sendKeys(characters);
  }

  async waitForUrlToMatch(expectedUrl, timeout = 1000) {
    await this.driver.wait(until.urlIs(expectedUrl), timeout).catch((error) => {
      console.error(`Timeout: URL did not match expected URL (${expectedUrl}) within the specified time.`);
      throw error;
    });
  }
}

module.exports = BasePage;
