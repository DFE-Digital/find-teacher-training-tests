console.log("1. Foo");
const appInsights = require("applicationinsights");

appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY);
appInsights.start();

const client = appInsights.defaultClient;

console.log("2. Bar");

client.trackEvent({
  name: "Smoke tests working!",
  properties: { customProperty: "No tests to run yet, but that will change soon" }
});

console.log("3. End");
