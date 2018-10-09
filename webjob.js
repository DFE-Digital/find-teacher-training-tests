const appInsights = require("applicationinsights");

appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY);
appInsights.start();

const client = appInsights.defaultClient;

client.trackEvent({
  name: "Smoke tests working!",
  properties: { customProperty: "No tests to run yet, but that will change soon" }
});
