class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigateTo(url) {
    await this.driver.get(url);
  }

  async click(locator) {
    await this.driver.findElement(locator).click();
  }

  async sendKeys(locator, characters) {
    await this.driver.findElement(locator).sendKeys(characters);
  }

  async sleep(seconds) {
    await this.driver.sleep(seconds * 1000);
  }
}

module.exports = BasePage;
