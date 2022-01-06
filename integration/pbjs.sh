#!/usr/bin/env bash

# We generate pbjs files of our test files as known-good behavior for our test suite to use.
#
# Only a handful of integration tests use these so we hand-code it one-off.
#

#if [[ $# -eq 0 ]]; then
#  FILTER_PATH=""
#else
#  FILTER_PATH=$(realpath "$1")
#fi


INTEGRATION_DIR=$(realpath $(dirname "$BASH_SOURCE"))

if [[ $# -eq 0 ]]; then
  FILTER_PATHS=$INTEGRATION_DIR
else
  FILTER_PATHS="${@}"
fi

set -e

function match() {
  find $FILTER_PATHS -wholename "$1/*.proto" -type f  | grep -q .
}

if match "simple"; then
  yarn pbjs --force-message --force-number -t static-module -o integration/simple/pbjs.js integration/simple/simple.proto
  yarn pbts --no-comments -o integration/simple/pbjs.d.ts integration/simple/pbjs.js
fi

if match "simple-long"; then
  yarn run pbjs --force-message --force-long -t static-module -o integration/simple-long/pbjs.js integration/simple-long/simple.proto
  yarn run pbts --no-comments -o integration/simple-long/pbjs.d.ts integration/simple-long/pbjs.js
fi

if match "simple-long-string"; then
  yarn run pbjs --force-message --force-long -t static-module -o integration/simple-long-string/pbjs.js integration/simple-long-string/simple.proto
  yarn run pbts --no-comments -o integration/simple-long-string/pbjs.d.ts integration/simple-long-string/pbjs.js
fi

if match "vector-tile"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/vector-tile/pbjs.js integration/vector-tile/vector_tile.proto
  yarn run pbts --no-comments -o integration/vector-tile/pbjs.d.ts integration/vector-tile/pbjs.js
fi

if match "nestjs-metadata"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/nestjs-metadata/pbjs.js integration/nestjs-metadata/hero.proto
  yarn run pbts --no-comments -o integration/nestjs-metadata/pbjs.d.ts integration/nestjs-metadata/pbjs.js
fi

if match "nestjs-metadata-observables"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/nestjs-metadata-observables/pbjs.js integration/nestjs-metadata-observables/hero.proto
  yarn run pbts --no-comments -o integration/nestjs-metadata-observables/pbjs.d.ts integration/nestjs-metadata-observables/pbjs.js
fi

if match "nestjs-metadata-restparameters"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/nestjs-metadata-restparameters/pbjs.js integration/nestjs-metadata-restparameters/hero.proto
  yarn run pbts --no-comments -o integration/nestjs-metadata-restparameters/pbjs.d.ts integration/nestjs-metadata-restparameters/pbjs.js
fi

if match "nestjs-simple"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/nestjs-simple/pbjs.js integration/nestjs-simple/hero.proto
  yarn run pbts --no-comments -o integration/nestjs-simple/pbjs.d.ts integration/nestjs-simple/pbjs.js
fi

if match "nestjs-simple-observables"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/nestjs-simple-observables/pbjs.js integration/nestjs-simple-observables/hero.proto
  yarn run pbts --no-comments -o integration/nestjs-simple-observables/pbjs.d.ts integration/nestjs-simple-observables/pbjs.js
fi

if match "nestjs-simple-restparameters"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/nestjs-simple-restparameters/pbjs.js integration/nestjs-simple-restparameters/hero.proto
  yarn run pbts --no-comments -o integration/nestjs-simple-restparameters/pbjs.d.ts integration/nestjs-simple-restparameters/pbjs.js
fi

if match "oneof-proprties"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/oneof-properties/pbjs.js integration/oneof-properties/oneof.proto
  yarn run pbts --no-comments -o integration/oneof-properties/pbjs.d.ts integration/oneof-properties/pbjs.js
fi

if match "oneof-unions"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/oneof-unions/pbjs.js integration/oneof-unions/oneof.proto
  yarn run pbts --no-comments -o integration/oneof-unions/pbjs.d.ts integration/oneof-unions/pbjs.js
fi

if match "struct"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/struct/pbjs.js integration/struct/struct.proto
  yarn run pbts --no-comments -o integration/struct/pbjs.d.ts integration/struct/pbjs.js
fi

if match "value"; then
  yarn run pbjs --force-message --force-number -t static-module -o integration/value/pbjs.js integration/value/value.proto
  yarn run pbts --no-comments -o integration/value/pbjs.d.ts integration/value/pbjs.js
fi
