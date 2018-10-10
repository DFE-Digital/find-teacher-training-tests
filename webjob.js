const { exec } = require("child_process");
const path = require("path");

const { APPINSIGHTS_INSTRUMENTATIONKEY } = process.env;
let azureLoggingClient;

if (APPINSIGHTS_INSTRUMENTATIONKEY) {
  console.log("Appinsights initialised, will track events on Azure.");
  const appInsights = require("applicationinsights");

  appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY);
  appInsights.start();

  const azureLoggingClient = appInsights.defaultClient;

  azureLoggingClient.trackEvent({
    name: "Smoke tests working!",
    properties: { customProperty: "Smoke tests failed" }
  });
} else {
  console.log(
    "APPINSIGHTS_INSTRUMENTATIONKEY not defined in env, will not track events on Azure. Feel free to ignore this message if running locally."
  );
}

console.log("Starting tests; output is buffered rather than streamed, so you'll need to wait for about 2 minutes.");

const binPath = path.resolve("./node_modules/.bin/cypress");
exec(binPath + " run --spec cypress/integration/search-and-compare-ui/**/*", (error, stdout, stderr) => {
  console.log(stdout);

  const success = !error;
  if (azureLoggingClient) {
    if (success) {
      azureLoggingClient.trackEvent({
        name: "Smoke tests finished successfully"
      });

      process.exit(0);
    } else {
      console.log("Error:", error);
      console.log("stderr:", stderr);

      azureLoggingClient.trackEvent({
        name: "Smoke tests failed",
        properties: { error, stdout, stderr }
      });

      process.exit(1);
    }
  }
});
