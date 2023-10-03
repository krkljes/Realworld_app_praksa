# Realworld_app_praksa

Selenium WebDriver Login Test
This repository contains Selenium WebDriver test scripts for automating the login functionality of a web application. 
These scripts use JavaScript and the Selenium WebDriver library to interact with web elements and perform login tests.

Prerequisites
Before running the tests, make sure you have the following prerequisites installed:
Node.js: Download and install Node.js from nodejs.org.

Installation
Clone the repository to your local machine:
git clone https://github.com/krkljes/Realworld_app_praksa

Install the required dependencies:
npm install

Usage
LoginPage.js
The LoginPage.js file defines a Page Object Model (POM) class for the login page. 
It provides methods to interact with login elements and perform login actions. 
You can customize this class according to your specific application's structure.

login.test.js
The login.test.js file is a test script that uses the LoginPage class to perform a login test. 
It initializes the WebDriver, performs a login, and asserts the login success. 
Modify this script to adapt it to your application's behavior and elements.

To run the test, use the following command:
npm test

Configuration
The test data and configuration are stored in a testdata.json file and are used by the LoginPage.js class. 
Ensure that the data in testdata.json matches your application's login page structure and test requirements.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Acknowledgments
This project was created for educational purposes and as a reference for automating login tests using Selenium WebDriver.