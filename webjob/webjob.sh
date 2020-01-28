#!/usr/bin/env sh

# Dev
curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Travis-API-Version: 3" \
    -H "Authorization: token $TRAVIS_KEY" \
    -d "{ \"request\": { \"branch\": \"master\" } }" \
    https://api.travis-ci.org/repo/DFE-Digital%2ffind-teacher-training-tests/requests

# Staging
curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Travis-API-Version: 3" \
    -H "Authorization: token $TRAVIS_KEY" \
    -d "{ \"request\": { \"branch\": \"staging\" } }" \
    https://api.travis-ci.org/repo/DFE-Digital%2ffind-teacher-training-tests/requests

# Live
curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Travis-API-Version: 3" \
    -H "Authorization: token $TRAVIS_KEY" \
    -d "{ \"request\": { \"branch\": \"production\" } }" \
    https://api.travis-ci.org/repo/DFE-Digital%2ffind-teacher-training-tests/requests
