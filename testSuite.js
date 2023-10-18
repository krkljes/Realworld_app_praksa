const DriverFactory = require('./utils/DriverFactory');
const Mocha = require('mocha');

const [,, test, browserName] = process.argv;

if (!test || !browserName) {
  console.error("Usage: node testSuite.js <testName> <browserName>");
  process.exit(1);
}

// Attach browserName to the global object
global.browserName = browserName;

// Create a driver instance
const driver = DriverFactory.createDriver(global.browserName);

const mocha = new Mocha();
mocha.timeout(10000); // Set the global timeout

// Load the specified test script
mocha.addFile(`./tests/${test}`);

// Run the Mocha suite
mocha.run(async (failures) => {
  await driver.quit();
  process.exit(failures);
});
