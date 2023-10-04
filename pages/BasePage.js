const { By, until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigateTo(url) {
    await this.driver.get(url);
  }

  async click(locator) {
    const element = await this.driver.wait(until.elementLocated(locator), 5000);
    await this.driver.wait(until.elementIsEnabled(element), 5000);
    await element.click();
  }

  async sendKeys(locator, characters) {
    await this.driver.wait(until.elementLocated(locator),5000);
    await this.driver.findElement(locator).sendKeys(characters);
  }

  async waitForVisibility(locator) {
    const element = await this.driver.wait(until.elementLocated(locator));
    await this.driver.wait(until.elementIsVisible(element));
  }
}

module.exports = BasePage;
