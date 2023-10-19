# Cypress RealWorld App Automated Testing

## Overview

This repository contains an extensive test suite designed for automated testing of the Cypress RealWorld App. The Cypress RealWorld App can be downloaded from [here](https://github.com/cypress-io/cypress-realworld-app). Instructions on how to set up and use the RealWorld App are provided in its README file.

## Prerequisites

Before running the tests, make sure you have the following prerequisites installed:

- **Node.js**: If you don't have Node.js installed, you can download and install it from [nodejs.org](https://nodejs.org/).

## Installation

To set up the Cypress RealWorld App testing environment, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/krkljes/Realworld_app_praksa
    ```

2. Navigate to the project directory:

    ```bash
    cd Realworld_app_praksa
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

## Configuration

Configuration settings are maintained in the `utils` directory. This file contains data for both valid and invalid user accounts, URLs for different pages, and element locators used throughout the test scripts, as well as driver factory.

## Running the Tests

To execute the functional tests, you can use the following commands:

- To run all tests in the default browser (Chrome), use:

    ```bash
    npm test
    ```

- To run all tests in a specific browser, use the `--browser_name` flag with the desired browser name. Supported browsers are Chrome, Firefox, and Edge. For example, to run tests in Firefox:

    ```bash
    npm test --browser_name=firefox
    ```

- To run a specific test in a specific browser, use the `npm run test-suite` command followed by the test name and browser name. For example, to run a test named `signup.test.js` in Edge:

    ```bash
    npm run test-suite signup.test.js edge
    ```

Make sure you have the specified browser (Chrome, Firefox, or Edge) installed on your system and correctly configured for Cypress testing to use the browser of your choice.