#!/usr/bin/env bash

# Runs the local code generator for the .bin test files (as created/kept
# up-to-date by ./update-bins.sh). Good for local iteration of WIP changes.
#
# Usage:
#
# ./codegen.sh
#
#    Updates generated output for all integration tests.
#
# ./codegen.sh simple value
#
#    Updates generated output only for the 'simple' and 'value' integration test.
#
# ./codegen.sh simple/simple.bin
#
#    Updates generated output for the 'simple' integration test. Used by file watcher.
#
# Each integration test can optionally have a `parameters.txt` file that will
# be used as the ts-proto_opt... args for generating that test's code.

INTEGRATION_DIR=$(realpath $(dirname "$BASH_SOURCE"))

# Run the code generator in parallel. Note this is purposefully pinned to 5 because
# CI only has 2 cores, but we can go faster than that, and for me locally using all
# 16 cores is overly taxes the machine/kicks on fans/etc. 5 is a good balance.
N=5

echo "Generating typescript code for integration tests using ${N} cores..."

cd $INTEGRATION_DIR

if [[ $# -eq 0 ]]; then
  FILTER_PATHS=.
else
  FILTER_PATHS="${@}"
fi

# Finds .bin files that match the given filter paths, which can be directories or paths to the .bin files themselves.
BIN_FILES=$(find $FILTER_PATHS -name "*.bin" -type f | grep -v dump-response.bin)

for BIN_FILE in $BIN_FILES; do
  echo "${BIN_FILE}"
  # Strip the longest suffix starting at the 1st slash
  TEST_DIR="${BIN_FILE##./}"
  TEST_DIR="${TEST_DIR%%/*}"
  PARAMS=""

  if [ -f "${TEST_DIR}/parameters.txt" ]; then
    PARAMS=$(cat "${TEST_DIR}/parameters.txt")
  fi

  ((i=i%N)); ((i++==0)) && wait
  "../node_modules/.bin/ts-node" "./codegen.ts" "${TEST_DIR}" "${BIN_FILE}" "${PARAMS}" &
done

wait
