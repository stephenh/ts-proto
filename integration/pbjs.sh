#!/usr/bin/env bash

# We generate pbjs files of our test files as known-good behavior for our test suite to use.
#
# Only a handful of integration tests use these so we hand-code it one-off.
#

# simple/
yarn pbjs --force-message --force-number -t static-module -o integration/simple/pbjs.js integration/simple/simple.proto
yarn pbts --no-comments -o integration/simple/pbjs.d.ts integration/simple/pbjs.js

# simple-long
yarn pbjs --force-message --force-long -t static-module -o integration/simple-long/pbjs.js integration/simple-long/simple.proto
yarn pbts --no-comments -o integration/simple-long/pbjs.d.ts integration/simple-long/pbjs.js

# simple-long-string
yarn pbjs --force-message --force-long -t static-module -o integration/simple-long-string/pbjs.js integration/simple-long-string/simple.proto
yarn pbts --no-comments -o integration/simple-long-string/pbjs.d.ts integration/simple-long-string/pbjs.js

# vector-tile/
yarn pbjs --force-message --force-number -t static-module -o integration/vector-tile/pbjs.js integration/vector-tile/vector_tile.proto
yarn pbts --no-comments -o integration/vector-tile/pbjs.d.ts integration/vector-tile/pbjs.js

# nestjs-metadata/
yarn pbjs --force-message --force-number -t static-module -o integration/nestjs-metadata/pbjs.js integration/nestjs-metadata/hero.proto
yarn pbts --no-comments -o integration/nestjs-metadata/pbjs.d.ts integration/nestjs-metadata/pbjs.js

# nestjs-metadata-observables/
yarn pbjs --force-message --force-number -t static-module -o integration/nestjs-metadata-observables/pbjs.js integration/nestjs-metadata-observables/hero.proto
yarn pbts --no-comments -o integration/nestjs-metadata-observables/pbjs.d.ts integration/nestjs-metadata-observables/pbjs.js

# nestjs-metadata-restparameters/
yarn pbjs --force-message --force-number -t static-module -o integration/nestjs-metadata-restparameters/pbjs.js integration/nestjs-metadata-restparameters/hero.proto
yarn pbts --no-comments -o integration/nestjs-metadata-restparameters/pbjs.d.ts integration/nestjs-metadata-restparameters/pbjs.js

# nestjs-simple/
yarn pbjs --force-message --force-number -t static-module -o integration/nestjs-simple/pbjs.js integration/nestjs-simple/hero.proto
yarn pbts --no-comments -o integration/nestjs-simple/pbjs.d.ts integration/nestjs-simple/pbjs.js

# nestjs-simple-observables/
yarn pbjs --force-message --force-number -t static-module -o integration/nestjs-simple-observables/pbjs.js integration/nestjs-simple-observables/hero.proto
yarn pbts --no-comments -o integration/nestjs-simple-observables/pbjs.d.ts integration/nestjs-simple-observables/pbjs.js

# nestjs-simple-restparameters/
yarn pbjs --force-message --force-number -t static-module -o integration/nestjs-simple-restparameters/pbjs.js integration/nestjs-simple-restparameters/hero.proto
yarn pbts --no-comments -o integration/nestjs-simple-restparameters/pbjs.d.ts integration/nestjs-simple-restparameters/pbjs.js

# oneof-proprties/
yarn pbjs --force-message --force-number -t static-module -o integration/oneof-properties/pbjs.js integration/oneof-properties/oneof.proto
yarn pbts --no-comments -o integration/oneof-properties/pbjs.d.ts integration/oneof-properties/pbjs.js

# oneof-unions/
yarn pbjs --force-message --force-number -t static-module -o integration/oneof-unions/pbjs.js integration/oneof-unions/oneof.proto
yarn pbts --no-comments -o integration/oneof-unions/pbjs.d.ts integration/oneof-unions/pbjs.js
