#!/usr/bin/env sh

curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Travis-API-Version: 3" \
    -H "Authorization: token $TRAVIS_KEY" \
    -d "{ \"request\": { \"branch\": \"master\" } }" \
    https://api.travis-ci.org/repo/DFE-Digital%2fsearch-and-compare-ui-tests/requests
