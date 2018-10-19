#!/usr/bin/env sh

body='{ "request": { "branch": "master" } }'

curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Travis-API-Version: 3" \
    -H "Authorization: token $TRAVIS_KEY" \
    -d "$body" \
    https://api.travis-ci.org/repo/DFE-Digital%2fsearch-and-compare-ui-tests/requests
