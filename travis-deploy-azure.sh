#!/usr/bin/env bash

deployZip=deploy.zip

echo "Creating deploy folder…"
mkdir deploy

echo "Moving tests to deploy folder…"
cp -r cypress deploy
cp -r node_modules deploy
cp cypress.json deploy
cp package-lock.json deploy
cp package.json deploy
cp settings.job deploy
cp webjob.js deploy

echo "Removing old $deployZip if any…"
[ -e $deployZip ] && rm $deployZip

echo "Creating zip…"
cd deploy
zip --quiet ../$deployZip -r *
cd ..

echo "Uploading to azure WebJob…"
curl -X PUT -u "$1" --data-binary @$deployZip --header "Content-Type: application/zip" --header "Content-Disposition: attachment; filename=$deployZip" https://$2.scm.azurewebsites.net/api/triggeredwebjobs/smoke-tests/

echo "Deploy complete."
