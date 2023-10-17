const { Builder, Capabilities } = require('selenium-webdriver');

class DriverFactory {
  static createDriver(browserName) {
    let driver;

    if (browserName === 'chrome') {
      // Create a Chrome WebDriver instance
      driver = new Builder()
        .forBrowser('chrome')
        .withCapabilities(Capabilities.chrome())
        .build();
    } else if (browserName === 'firefox') {
      // Create a Firefox WebDriver instance
      driver = new Builder()
        .forBrowser('firefox')
        .withCapabilities(Capabilities.firefox())
        .build();
    } else if (browserName === 'edge') {
      // Create a Firefox WebDriver instance
      driver = new Builder()
        .forBrowser('MicrosoftEdge')
        .withCapabilities(Capabilities.edge())
        .build();
    }else {
      throw new Error(`Unsupported browser: ${browserName}`);
    }

    return driver;
  }
}

module.exports = DriverFactory;
