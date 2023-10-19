const Mocha = require('mocha');

const [,, test, browserName] = process.argv;

if (!test || !browserName) {
  console.error("Usage: npm run test-suite <testName> <browserName>");
  process.exit(1);
}

// Attach browserName to the global object
global.browserName = browserName;

const mocha = new Mocha();
mocha.timeout(10000); // Set the global timeout

// Load the specified test script
mocha.addFile(`./tests/${test}`);

// Run the Mocha suite
mocha.run(async (failures) => {
  await driver.quit();
  process.exit(failures);
});
