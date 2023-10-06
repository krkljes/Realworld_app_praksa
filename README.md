# Selenium WebDriver Tests

This repository contains a test suite for automating login and signup functionality using Selenium WebDriver with JavaScript. The test suite is organized into two main test cases: Login Test and Sign Up Test.

## Prerequisites

Before running the tests, make sure you have the following prerequisites installed:

- Node.js: Download and install Node.js from [nodejs.org](https://nodejs.org/).

## Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/krkljes/Realworld_app_praksa
   ```

2. Navigate to the project directory:

   ```
   cd Realworld_app_praksa
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

## Test Scripts

### `LoginPage.js`

The `LoginPage.js` file defines a Page Object Model (POM) class for the login page. It provides methods to interact with login elements and perform login actions. The class uses data from `testdata.json` to perform login actions.

### `login.test.js`

The `login.test.js` script uses the `LoginPage` class to perform login tests. It checks for successful login and displays an error message for invalid login attempts.

### `SignUpPage.js`

The `SignUpPage.js` file defines a Page Object Model (POM) class for the sign-up page. It provides methods to interact with sign-up elements and perform sign-up actions. The class uses data from `testdata.json` to perform sign-up actions.

### `signup.test.js`

The `signup.test.js` script uses the `SignUpPage` class to perform sign-up tests. It checks for successful sign-up and validates that the signup button is disabled for invalid sign-up attempts.

## Configuration

The test data and configuration are stored in a `testdata.json` file. This file includes data for valid and invalid user accounts, URLs for different pages, and element locators used in the test scripts.

## Running the Tests

To run the tests, use the following command:

```
npm test
```
