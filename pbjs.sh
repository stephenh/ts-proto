#!/bin/bash

# Generates objects with pbjs so we can bootstrap, i.e. currently
# the plugin uses pbjs-generated types of the protobuf DTOs to
# enerate its output ts-proto types. At somepoint we could become
# self-hosted, which would be spiffy but not a big deal.

mkdir -p build
yarn pbjs --force-message -t static-module -o build/pbjs.js \
  google/protobuf/descriptor.proto \
  google/protobuf/compiler/plugin.proto
yarn pbts --no-comments -o build/pbjs.d.ts build/pbjs.js


# We generate pbjs files of our test files as known-good behavior
# for our test suite to use.
mkdir -p build/integration
yarn pbjs --force-message -t static-module -o build/integration/pbjs.js \
  integration/simple.proto \
  integration/vector_tile.proto
yarn pbts --no-comments -o build/integration/pbjs.d.ts build/integration/pbjs.js

