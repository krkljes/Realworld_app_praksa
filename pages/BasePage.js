const { Key, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require('path');

// BasePage class for common Selenium WebDriver actions
class BasePage {
  constructor(driver) {
    this.driver = driver;
  }
  
  // Method to navigate to a specified URL

   async navigateTo(url) {
    try {
      await this.driver.get(url);
    } catch (error) {
      // Handle any errors that occur during navigation
      throw new Error(`Error navigating to ${url}: ${error.message}`);
    }
  }

  // Method to click on an element located by a provided locator
  async click(locator, timeout = 10000) {
    const clickFunction = async () => {
      const element = await this.driver.findElement(locator);
      await element.click();
      return true; // Click successful, resolve the promise
    };
  
    if (await clickFunction()) {
      return; // Click was successful immediately, resolve the promise
    }
  
    try {
      await this.waitWithTimeout(clickFunction, timeout);
    } catch (error) {
      // Handle the error when the click action fails or times out
      throw new Error(`Timeout: Unable to click the element located by ${locator} within the specified time.`);
    }
  }

  // Method to send a sequence of characters to an element located by a provided locator
  async sendKeys(locator, characters, timeout = 1000) {
    await this.driver.wait(until.elementLocated(locator), timeout); // Wait for the element to be located
    await this.driver.findElement(locator).sendKeys(characters); // Send the provided characters to the element
  }

  async expectTextToEqual(element, expectedText, timeout = 5000) {
    const checkFunction = async () => {
      const actualText = await element.getText();
      return {
        match: actualText === expectedText,
        actualText
      };
    };
  
    return this.waitWithTimeout(checkFunction, timeout)
      .then(() => {
        return;// Text matches, resolve the promise
      })
      .catch((error) => {
        // Handle the timeout or other errors
        if (error.message === 'Timeout') {
          throw (new Error(`Timeout: Text did not match "${expectedText}" within the specified time.`));
        } else {
          throw error;
        }
      });
  }

  // Method to wait for the URL to match an expected URL within a specified timeout
  async waitForUrlToMatch(url, timeout = 1000) {
    const checkFunction = async () => {
      const currentUrl = await this.driver.getCurrentUrl();
      return currentUrl === url;
    };
  
    return this.waitWithTimeout(checkFunction, timeout)
      .then(() => {
        return; // URL matches, resolve the promise
      })
      .catch((error) => {
        // Handle the timeout or other errors
        if (error.message === 'Timeout') {
          throw new Error(`Timeout: URL did not match "${url}" within the specified time.`);
        } else {
          throw error;
        }
      });
  }

  // Method to wait for the element to become visible
  async waitForElementToBeVisible(locator, timeout = 2000) {
    const isVisibleFunction = async () => {
      const element = this.driver.findElement(locator);
      const isVisible = await element.isDisplayed();
      if (isVisible) {
        return true; // Element is visible, resolve the promise
      }
      return false;
    };
  
    if (await isVisibleFunction()) {
      return; // Element is visible immediately, resolve the promise
    }
  
    try {
      await this.waitWithTimeout(isVisibleFunction, timeout);
    } catch (error) {
      // Handle the error when the element doesn't become visible within the specified timeout
      throw new Error(`Timeout: Element located by ${locator} did not become visible within the specified time.`);
    }
  }


  //Method to clear the selected input field
  async clearInputField(locator) {
    return new Promise(async (resolve, reject) => {
      try {
        const inputField = await this.driver.findElement(locator);
        await inputField.sendKeys(Key.chord(Key.CONTROL, "a")); // Select all text
        await inputField.sendKeys(Key.BACK_SPACE); // Delete selected text
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  //Method to return the locator text
  async getText(elementLocator, timeout = 1000) {
    const element = await this.driver.wait(
      until.elementLocated(elementLocator),
      timeout
    );
    return element.getText();
  }

  // Method to click on a random user from a list
  async clickRandomUserInList(userListLocator) {
    const listItems = await this.driver.findElements(userListLocator); // Find all list items
    for (const listItem of listItems) {
      const associatedText = await listItem.getText(); // Get the text associated with the current list item
      if (associatedText.includes("A")) {
        // Check if the text includes the target name
        await listItem.click(); // Click the button
        return; // Exit the loop
      }
    }
  }
  
  // Method to get the current timestamp as a string
  getCurrentTimestamp() {
    return Date.now().toString(); // Get the current timestamp and convert it to a string
  }

    // Waits for a specified condition to be met or times out.
    async waitWithTimeout(checkFunction, timeout) {
      return new Promise((resolve, reject) => {
        const checkInterval = 100; // Time interval between checks
    
        const check = async () => {
          try {
            const result = await checkFunction();
            if (result) {
              resolve(result);
            } else if (timeout <= 0) {
              reject(new Error('Timeout'));
            } else {
              setTimeout(check, checkInterval);
              timeout -= checkInterval;
            }
          } catch (error) {
            reject(error);
          }
        };
    
        check();
      });
    }

  // Capture a screenshot and save it with a timestamp and a test title
  async takeScreenshot(testTitle, screenshotDir) {
    if (this.driver) {
      const timestamp = new Date().toISOString().replace(/[-T:.]/g, "_");
      const screenshot = await this.driver.takeScreenshot();
      const fileName = `Screenshot-${timestamp}_${testTitle}.png`;
      const filePath = path.join(screenshotDir, fileName);
      fs.writeFileSync(filePath, screenshot, "base64");
    }
  }
}

module.exports = BasePage;
