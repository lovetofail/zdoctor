#!/usr/bin/env bash



# run yarn twice, ignoring errors from the first one
# https://github.com/yarnpkg/yarn/issues/6988
yarn --cwd ../../ install || true
yarn --cwd ../../ install 
