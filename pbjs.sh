#!/bin/bash

# Generates objects with pbjs so we can bootstrap.

mkdir -p build
yarn pbjs --force-message -t static-module -o build/pbjs.js \
  google/protobuf/descriptor.proto \
  google/protobuf/compiler/plugin.proto \
  simple.proto
yarn pbts --no-comments -o build/pbjs.d.ts build/pbjs.js

