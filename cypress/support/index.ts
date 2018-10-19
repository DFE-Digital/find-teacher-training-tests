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

const CURRENT_BRANCH = process.env.CURRENT_BRANCH;

switch (CURRENT_BRANCH) {
    case 'master':
        global.URL = "https://bat-dev-search-and-compare-ui-app.azurewebsites.net";
        break;
    case 'staging':
        global.URL = "https://bat-staging-search-and-compare-ui-app.azurewebsites.net";
        break;
    case 'production':
        global.URL = "https://find-postgraduate-teacher-training.education.gov.uk";
        break;
    default:
        global.URL = "https://find-postgraduate-teacher-training.education.gov.uk";
        break;
}
