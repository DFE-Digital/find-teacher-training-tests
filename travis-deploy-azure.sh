#!/usr/bin/env bash

deployZip=deploy.zip

echo "Removing old $deployZip if any…"
[ -e $deployZip ] && rm $deployZip

echo "Creating zip…"
zip $deployZip -r ./

echo "Uploading to azure WebJob…"
curl -X PUT -u "$1" --data-binary @$deployZip --header "Content-Type: application/zip" --header "Content-Disposition: attachment; filename=$deployZip" https://$2.scm.azurewebsites.net/api/triggeredwebjobs/smoke-tests/

echo "Deploy complete."
