const { spawn } = require("child_process");

const APPINSIGHTS_INSTRUMENTATIONKEY = process.env.APPINSIGHTS_INSTRUMENTATIONKEY;
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

const child = spawn("npm", ["test"]);
const stdout = "";
const stderr = "";

child.stdout.on("data", data => {
  stdout += data.toString();
  process.stdout.write(data.toString());
});

child.stderr.on("data", data => {
  stderr += data.toString();
  console.error(data.toString());
});

child.on("exit", (code, signal) => {
  console.log("Tests child process exited with " + `code ${code} and signal ${signal}`);
  const success = code === 0;
  if (azureLoggingClient) {
    if (success) {
      azureLoggingClient.trackEvent({
        name: "Smoke tests finished successfully",
        properties: { customProperty: "Smoke tests failed" }
      });
    } else {
      azureLoggingClient.trackEvent({
        name: "Smoke tests failed",
        properties: { stdout, stderr }
      });
    }
  }

  process.exit(code);
});
