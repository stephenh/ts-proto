#!/usr/bin/env bash

yarn build
(cd ./integration || exit; ./codegen.sh)
yarn test
yarn publish
