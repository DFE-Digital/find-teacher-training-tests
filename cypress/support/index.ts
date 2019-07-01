// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
require("./commands.ts");

switch (Cypress.env("TRAVIS_BRANCH")) {
  case "master":
    global.TEST_ENV = "dev";
    global.URL = "https://bat-qa-sacui-as.azurewebsites.net";
    break;
  case "staging":
    global.TEST_ENV = "staging";
    global.URL = "https://bat-staging-search-and-compare-ui-app.azurewebsites.net";
    break;
  case "production":
    global.TEST_ENV = "production";
    global.URL = "https://www.find-postgraduate-teacher-training.service.gov.uk";
    break;
  default:
    global.TEST_ENV = "production";
    global.URL = "https://www.find-postgraduate-teacher-training.service.gov.uk";
    break;
}
